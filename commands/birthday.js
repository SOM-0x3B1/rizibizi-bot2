const { SlashCommandBuilder } = require('@discordjs/builders');
const { createConnection } = require('mysql');
const { dbpassword } = require('../config.json');

const db = createConnection({
    host: 'localhost',
    user: 'rizibizi',
    password: dbpassword,
    database: 'rizibizi',
    dateStrings: 'date',
});
db.connect((err) => {
    if (err) throw err;
});


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
        switch (interaction.options.getSubcommand()) {
            case 'next':
                let users = '';
                db.query('SELECT name, date FROM users ORDER BY DATE LIMIT 1', (_, result) => {
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
                db.query('SELECT date FROM users WHERE id = ? ', `${user.username}#${user.discriminator}`, (_, resq) => {
                    res = resq[0];
                    if (res)
                        interaction.reply(`User '${user.username}#${user.discriminator}' was born on ${res.date}.`);
                    else
                        interaction.reply(`User '${user.username}#${user.discriminator}' was not found in the database.`);
                });
                break;
        }
    },
};