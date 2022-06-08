const { SlashCommandBuilder } = require('@discordjs/builders');
const pool = require('../dbpool.js').getPool();

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
                .setDescription('Displays the next birthday')),
    async execute(interaction) {
        pool.getConnection((_0, con) => {
            switch (interaction.options.getSubcommand()) {
                case 'next':
                    let users = '';
                    con.query('SELECT name, date FROM users ORDER BY DATE LIMIT 1', (_1, result) => {
                        for (const user of result)
                            users += `\n${user.name}: ${user.date}`;
                        if (users)
                            interaction.reply('Next birthday(s):' + users);
                        else
                            interaction.reply('no thanks');
                    });
                    break;
                case 'stalk_user':
                    let res;
                    const user = interaction.options.getUser('user');
                    con.query('SELECT date FROM users WHERE id = ? ', `${user.username}#${user.discriminator}`, (_1, resq) => {
                        res = resq[0];
                        if (res)
                            interaction.reply(`User '${user.username}#${user.discriminator}' was born on ${res.date}.`);
                        else
                            interaction.reply(`User '${user.username}#${user.discriminator}' was not found in the database.`);
                    });
                    break;
            }
            con.release();
        });
    },
};