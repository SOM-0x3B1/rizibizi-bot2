const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('../package.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rizibizi')
        .setDescription('Displays bot information'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor('#E3581C')
            .setTitle('Welcome to Rizibizi!')
            .setAuthor({ name: 'Onekilobit Servers', iconURL: 'https://www.onekilobit.eu/media/rizibizi/icon.png', url: 'https://www.onekilobit.eu/' })
            .setThumbnail('https://www.onekilobit.eu/media/rizibizi/pot-animated_5.png')
            .addFields({
                name: 'Bot tag',
                value: interaction.client.user.tag,
                inline: true,
            }, {
                name: 'Version',
                value: version,
                inline: true,
            }, {
                name: 'Source',
                value: 'https://github.com/SOM-0x3B1/rizibizi-bot2',
            })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};