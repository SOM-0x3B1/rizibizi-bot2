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
                .setName('stalkuser')
                .setDescription('Displays a user\'s birthday')
                .addUserOption(option =>
                    option
                        .setName('user')
                        .setDescription('The user you want to stalk on')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('next')
                .setDescription('Displays the next birthday')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'next') {
            let users = '';
            db.query('SELECT TOP 1 name, date FROM users ORDER BY', (_, result) => {
                for (const user of result) {
                    users += `\n${user.name}:\t${user.date}`;
                }
            });
            await interaction.reply(users);
        }
        else if (interaction.options.getSubcommand() === 'stalkuser') {
            let res;
            const username = interaction.options.getUser('user').username;
            const discriminator = interaction.options.getUser('user').discriminator;
            await db.query('SELECT name, date FROM users WHERE id = ? ', `${username}#${discriminator}`, (_, result) => {
                res = result[0];
                interaction.reply(`User ${username}#${discriminator} (${res.name}) was born on ${res.date}.`);
            });
        }
    },
};