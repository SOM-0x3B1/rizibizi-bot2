const { Client, Intents } = require('discord.js');
const config = require("./config.json");
const { help, sendTextWithFile } = require('./commands.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });



client.on('ready', () => {
    console.log(`Bot ${client.user.tag} is logged in!`);
});

client.on("messageCreate", async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith('/')) return;

    const commandBody = message.content.slice(1);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'rb' || command === 'rizibizi') {
        if (args.length > 0) {
            switch (args.shift()) {
                case 'ping':
                    message.reply('pong');
                    break;
                case 'help':
                    help(message);
                    break;
                case 'h':
                    help(message);
                    break;
                case 'fu':
                    message.delete();
                    sendTextWithFile(message, 'fuck you', './media/fuckyou.gif');
                    break;
                case 'fme':
                    message.delete();
                    sendTextWithFile(message, 'fuck me', './media/fuckme.gif');
                    break;
            }
        }
        else {
            //message.channel.send({ files: ['./media/pot-lid2.gif'], content: 'Welcome to Rizibizi v0.1.2\nType `/rb h` or `/rizibizi help` for the command list.\nWebsite: https://www.onekilobit.eu/brigad/rizibizi' });
            sendTextWithFile(message, 'Welcome to Rizibizi v0.1.3\nType `/rb h` or `/rizibizi help` for the command list.\nWebsite: https://www.onekilobit.eu/brigad/rizibizi', './media/pot-lid2.gif');
        }
    }
});


client.login(config.BOT_TOKEN);