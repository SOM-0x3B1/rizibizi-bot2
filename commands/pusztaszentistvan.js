const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pusztaszentistván')
        .setDescription('Egyelőre csak egy feliratkozás gomb van'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('subToPSzI')
                    .setLabel('Subscribe')
                    .setStyle('DANGER'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('unsubToPSzI')
                    .setLabel('Unsubscribe')
                    .setStyle('SECONDARY'),
            );

        await interaction.reply({ content: 'Ha a jövőben megpinggelhetlek pusztaszentistváni bulájos hírekkel, itt egy piros gomb:', components: [row] });
    },
};