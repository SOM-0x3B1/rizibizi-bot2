const { SlashCommandBuilder } = require('@discordjs/builders');
const pool = require('../dbpool.js').getPool();

const selectAll = 'SELECT name, day, month, num_month FROM birthdays INNER JOIN numeric_months ON birthdays.month = numeric_months.full_month ORDER BY num_month, day';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('birthday')
        .setDescription('Shows birthday informations')
        .addSubcommand(subcommand =>
            subcommand
                .setName('stalk_user')
                .setDescription('Displays a user\'s birthday')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setRequired(true)
                        .setDescription('The user you want to stalk on')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('next')
                .setDescription('Displays the next birthday'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('showall')
                .setDescription('Displays all registered birthdays')),
    async execute(interaction) {
        pool.getConnection((_0, con) => {
            let users = '';
            switch (interaction.options.getSubcommand()) {
                case 'next':
                    con.query(selectAll, (_1, result) => {
                        if (result) {
                            const today = new Date();
                            const day = today.getDate();
                            const month = today.getMonth() + 1;

                            let i = 0;
                            while (result[i].num_month < month || (result[i].num_month == month && result[i].day <= day))
                                i++;

                            const targetMonth = result[i].num_month;
                            const targetDay = result[i].day;

                            while (result[i].num_month == targetMonth && result[i].day == targetDay) {
                                users += `\n**${result[i].name}:** \t${result[i].month} ${result[i].day}.`;
                                i++;
                            }

                            interaction.reply('A következő szülinap(ok):' + users);
                        }
                        else
                            interaction.reply('Hiba: adatbázis probléma');
                    });
                    break;
                case 'stalk_user':
                    let res;
                    const user = interaction.options.getUser('user');
                    con.query('SELECT name, month, day FROM birthdays WHERE id = ? ', user.id, (_1, resq) => {
                        res = resq[0];
                        if (res)
                            interaction.reply(`${res.name} szülinapja: ${res.month} ${res.day}.`);
                        else
                            interaction.reply(`'${user.username}#${user.discriminator}' nincs regisztrálva az adatbázisban.`);
                    });
                    break;
                case 'showall':
                    con.query(selectAll, (_1, result) => {
                        if (result) {
                            for (const u of result)
                                users += `\n**${u.name}:** \t ${u.month} ${u.day}.`;
                            interaction.reply('A regisztrált szülinapok listája:' + users);
                        }
                        else
                            interaction.reply('Hiba: adatbázis probléma');
                    });
                    break;
            }
            con.release();
        });
    },
};