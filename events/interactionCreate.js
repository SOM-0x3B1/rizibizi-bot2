/* eslint-disable no-unused-vars */
// const pool = require('../dbpool.js').getPool();
const PSzIRoleId = '976893725873688699';

const pool = require('../dbpool.js').getPool();

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
                case 'payagain':
                    const money = Math.floor(Math.random() * 50);
                    pool.getConnection((_0, con) => {
                        con.query('SELECT user FROM bmoney WHERE user = ?', member.id, (err, res1) => {
                            if (err) throw err;
                            if (res1.length == 0) {
                                con.query('INSERT INTO bmoney (user, money) VALUES (?, ?)', [member.id, money], (err2, res2) => {
                                    if (err2) throw err2;
                                    console.log(`1 record (${member.username}) inserted`);
                                });
                            }
                            else {
                                con.query('UPDATE bmoney SET money = money + ? WHERE user = ?', [money, member.id], (err, _1) => {
                                    if (err) throw err;
                                });
                            }
                        });
                    });
                    interaction.reply({ content: `You got $${money}\nTake it and fuck off.` });
                    break;
                /* case 'uncome':
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