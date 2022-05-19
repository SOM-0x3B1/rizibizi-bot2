const PSzIRoleId = '976893725873688699';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({ content: 'An error occurred while executing this command!', ephemeral: true });
            }
        }
        else if (interaction.isButton()) {
            const member = interaction.member;
            switch (interaction.customId) {
                case 'subToPSzI':
                    if (!member.roles.cache.has(PSzIRoleId)) {
                        const role = await interaction.guild.roles.fetch(PSzIRoleId);
                        await member.roles.add(role);
                        await interaction.reply({ content: 'Üdv a sutttyók közt! :leafy_green:', ephemeral: true });
                        console.log(interaction.user.username + ' subscribed');
                    }
                    else
                        await interaction.reply({ content: 'Skill issue: Még nem lehetsz dupla-suttyó.', ephemeral: true });
                    break;
                case 'unsubToPSzI':
                    if (member.roles.cache.has(PSzIRoleId)) {
                        await member.roles.remove(PSzIRoleId);
                        await interaction.reply({ content: 'Már nem vagy suttyó. :bricks:', ephemeral: true });
                        console.log(interaction.user.username + ' unsubscribed');
                    }
                    else
                        await interaction.reply({ content: 'Skill issue: még nem is vagy suttyó.', ephemeral: true });
                    break;
            }
        }
    },
};