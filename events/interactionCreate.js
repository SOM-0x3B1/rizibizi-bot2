// const pool = require('../dbpool.js').getPool();
const PSzIRoleId = '976893725873688699';

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.isCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try { await command.execute(interaction); }
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
                    else {
                        await interaction.reply({ content: 'Skill issue: Tényleg dupla-suttyó akarsz lenni?', ephemeral: true });
                        console.log(interaction.user.username + ' doublesubscribed');
                    }
                    break;
                case 'unsubToPSzI':
                    if (member.roles.cache.has(PSzIRoleId)) {
                        await member.roles.remove(PSzIRoleId);
                        await interaction.reply({ content: 'Már nem vagy suttyó. :bricks:', ephemeral: true });
                        console.log(interaction.user.username + ' unsubscribed');
                    }
                    else {
                        await interaction.reply({ content: 'Skill issue: még nem is vagy suttyó.', ephemeral: true });
                        console.log(interaction.user.username + ' doubleunsubscribed');
                    }
                    break;
                /* case 'come':
                    await participate(interaction);
                    await interaction.reply({ content: ':fire:', ephemeral: true });
                    console.log(interaction.user.username + ' will come');
                    break;
                case 'uncome':
                    await participate(interaction);
                    await interaction.reply({ content: 'Then take this :bricks: and fuck off', ephemeral: true });
                    console.log(interaction.user.username + ' won\'t come');
                    break;*/
            }
        }
    },
};

/* async function participate(interaction) {
    const user = interaction.options.getUser('user');

    pool.getConnection((_0, con) => {

        switch (interaction.customId) {
            case 'come':
                // eslint-disable-next-line no-unused-vars

                break;
            case 'uncome':
                con.query('SELECT date FROM users WHERE id = ? ', `${user.username}#${user.discriminator}`, (_1, resq) => {

                });
                break;
        }
        con.release();
    });
}*/