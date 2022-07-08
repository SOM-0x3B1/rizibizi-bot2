const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dont')
        .setDescription('don\'t'),
    async execute(interaction) {
        await interaction.reply({ content: 'don\'t' });
    },
};