const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pusztaszentistván')
        .setDescription('Egyelőre csak egy feliratkozás gomb van')
        .addSubcommand(subcommand =>
            subcommand
                .setName('subscribe')
                .setDescription('Sends a panel with which ppl can get the suttyó role.'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('participate')
                .setDescription('Sends a panel with which ppl can choose whether they\'ll come.')),
    async execute(interaction) {
        const row = new MessageActionRow();
        switch (interaction.options.getSubcommand()) {
            case 'subscribe':
                row.addComponents(
                    new MessageButton()
                        .setCustomId('subToPSzI')
                        .setLabel('Subscribe')
                        .setStyle('DANGER'),
                ).addComponents(
                    new MessageButton()
                        .setCustomId('unsubToPSzI')
                        .setLabel('Unsubscribe')
                        .setStyle('SECONDARY'),
                );
                await interaction.reply({ content: 'Ha a jövőben megpinggelhetlek pusztaszentistváni bulájos hírekkel, itt egy piros gomb:', components: [row] });
                break;
            /* case 'participate':
                row.addComponents(
                    new MessageButton()
                        .setCustomId('come')
                        .setLabel('Valószínűleg igen')
                        .setStyle('SUCCESS'),
                ).addComponents(
                    new MessageButton()
                        .setCustomId('uncome')
                        .setLabel('Valószínűleg nem')
                        .setStyle('DANGER'),
                );
                await interaction.reply({ components: [row] });
                break;*/
        }
    },
};