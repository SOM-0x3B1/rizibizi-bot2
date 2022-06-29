/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

const pool = require('../dbpool.js').getPool();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('riziboobie')
        .setDescription('BoobBot helyettesítő')
        .addSubcommand(subcommand =>
            subcommand
                .setName('payday')
                .setDescription('Fizetésnap'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('mypot')
                .setDescription('Fizetésnap'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('ourpot')
                .setDescription('Fizetésnap'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('boob')
                .setDescription('boob')),
    async execute(interaction) {
        const row = new MessageActionRow();
        const user = interaction.user;
        pool.getConnection((_0, con) => {
            switch (interaction.options.getSubcommand()) {
                case 'payday':
                    /* row.addComponents(
                        new MessageButton()
                            .setCustomId('payagain')
                            .setLabel('Again')
                            .setStyle('DANGER'),
                    );*/
                    const money = Math.floor(Math.random() * 50);

                    con.query('SELECT user FROM bmoney WHERE user = ?', user.id, (err, res1) => {
                        if (err) throw err;
                        if (res1.length == 0) {
                            con.query('INSERT INTO bmoney (user, money) VALUES (?, ?)', [user.id, money], (err2, res2) => {
                                if (err2) throw err2;
                                console.log(`1 record (${user.username}) inserted`);
                            });
                        }
                        else {
                            con.query('UPDATE bmoney SET money = money + ? WHERE user = ?', [money, user.id], (err, _1) => {
                                if (err) throw err;
                            });
                        }
                    });

                    interaction.reply({ content: `You got $${money}\nTake it and fuck off.` });
                    break;
                case 'mypot':
                    console.log('1');
                    con.query('SELECT money FROM bmoney WHERE user = ?', user.id, (err, res1) => {
                        if (err) throw err;
                        if (res1.length > 0)
                            interaction.reply({ content: `You have $${res1[0].money} in our rizibizi pot.` });
                        else
                            interaction.reply({ content: 'You don\'t have any money in our rizibizi pot.' });
                    });
                    break;
                case 'ourpot':
                    console.log('2');
                    con.query('SELECT SUM(money) as sumMoney FROM bmoney', (err, res1) => {
                        if (err) throw err;
                        if (res1.length > 0)
                            interaction.reply({ content: `We have $${res1[0].sumMoney} in our rizibizi pot.` });
                        else
                            interaction.reply({ content: 'We don\'t have any money in our rizibizi pot.' });
                    });
                    break;
                case 'boob':
                    interaction.reply({ content: 'booby', ephemeral: true });
                    break;
            }
        });
    },
};