// Require the necessary discord.js classes
const { 
    token, 
    adminId, 
    guildId, 
    clientId, 
    allowChannelId, 
    allowKeyword, 
    gameChannelId, 
    generalChannelId 
} = require("../config.json");
const { Client, Intents } = require("discord.js");


const PG = require("./dao/index");
const { adminCommand } = require("./command/admin");
const { leagueCommand } = require("./command/league");

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");
});

PG.connect();

client.on('interactionCreate', interaction => {
	if (!interaction.isButton()) return;
	console.log(interaction);
});

client.on("messageCreate", async (message) => {
    const sendMessage = (str, actions) => {
        if (!str) return message.reply("알 수 없는 오류");
        const splited = str.split('\n\n');
        const lastMessage = splited.reduce((prev, curr) => {
            if(prev.length + curr.length + 4 > 2000) {
                message.reply({content: prev, components: actions});
                return curr;
            } 
            return prev + "\n\n" + curr;
        }, "")

        message.reply({content: lastMessage, components: actions});
    };

    try {
        console.log(message);
        if (message.author.id === clientId) return;
        if (message.guildId !== guildId) return;

        const isCommand = (keyword = "") => {
            const prefix = "!";
            return message.content.startsWith(`${prefix}${keyword}`);
        };

        // Exit and stop if it's not there
        if (!isCommand()) return;

        const [keyword, ...param] = message.content.split(" ");

        if (!allowChannelId.includes(message.channelId) && !allowKeyword.includes(keyword.substring(1))) return;

        if (`!${parseInt(keyword.substring(1))}` === keyword) {
            sendMessage(calcDutchPay([parseInt(keyword.substring(1))]));
            return;
        }
        
        switch (keyword) {
            case "!ping":
                sendMessage("pong!");
                break;

            case "!리그":
                sendMessage(await leagueCommand(param))
                break;

            case "!관리자":
                if (message.author.id !== adminId) return sendMessage("권한이 없습니다.");

                const resultMsg = await adminCommand(param);
                sendMessage(resultMsg);
                break;

            default:
                sendMessage("존재하지 않는 명령어 입니다.");
        }
    } catch (e) {
        sendMessage("알수 없는 에러");
    }
});

client.on("messageReactionAdd", async (reaction, user) => {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("Something went wrong when fetching the message:", error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    console.log(`${reaction.emoji.name}:${reaction.emoji.id}`);

    // Now the message has been cached and is fully available
    console.log(`${reaction.message.author.username}'s message "${reaction.message.content}" gained a reaction!`);
    // The reaction is now also fully available and the properties will be reflected accurately:
    console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

client.on("messageReactionRemove", async (reaction, user) => {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
            await reaction.fetch();
        } catch (error) {
            console.error("Something went wrong when fetching the message:", error);
            // Return as `reaction.message.author` may be undefined/null
            return;
        }
    }

    console.log(`${reaction.message}`);

    // Now the message has been cached and is fully available
    console.log(`${reaction.message.author.username}'s message "${reaction.message.content}" lefted a reaction!`);
    // The reaction is now also fully available and the properties will be reflected accurately:
    console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});

// Login to Discord with your client's token
client.login(token);
