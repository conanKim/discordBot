// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token, clientId, allowChannelId } = require("./config.json");
const { getUserLevel } = require("./command/level");
const { getGoldEmbed } = require("./command/gold");
const { parseCultureCoupon } = require("./command/coupon");
const { getHomework } = require("./command/homework");
const { getBreath, setBreath } = require("./command/breath");
const { calcDutchPay } = require("./command/dutchPay");
const { joinRaid } = require("./command/raid");
const { getMember } = require("./command/member");

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

client.on("messageCreate", async (message) => {
    console.log(message);
    if (message.author.id === clientId) return;
    if (!allowChannelId.includes(message.channelId)) return;

    const isCommand = (keyword = "") => {
        const prefix = "!";
        return message.content.startsWith(`${prefix}${keyword}`);
    };

    const sendMessage = (str = "") => {
        message.reply(str);
    };

    // Exit and stop if it's not there
    if (!isCommand()) return;

    const [keyword, ...param] = message.content.split(" ");

    if(`!${parseInt(keyword.substring(1))}` === keyword) {
        sendMessage(calcDutchPay(param));
        return;
    }

    switch (keyword) {
        case "!ping":
            sendMessage("pong!");
            break;

        case "!help":
        case "!command":
        case "!명령어":
            let command = "!주사위 [범위]\n";
            command += "!쌀 [금액]\n";
            command += "!레벨 [이름]\n";
            command += "!골드\n";
            command += "!숙제\n";
            sendMessage(command);
            break;

        case "!쌀":
        case "!n":
        case "!N":
        case "!ㅜ":
            sendMessage(calcDutchPay(param));
            break;

        case "!주사위":
            const max = param[0] || 100;
            sendMessage(`주사위 ${max}\n결과 : ${Math.floor(Math.random() * max)}`);
            break;

        case "!멤버":
            sendMessage(await getMember(param));
            break;

        case "!레벨":
            const msg = await getUserLevel(param[0]);
            sendMessage(msg);
            break;

        case "!골드":
            sendMessage(getGoldEmbed());
            break;

        case "!풀숨":
            sendMessage(getBreath(param));
            break;

        case "!풀숨설정":
            sendMessage(setBreath(param));
            break;

        case "!숙제":
            sendMessage(getHomework());
            break;

        case "!문상":
            sendMessage(parseCultureCoupon(param));
            break;

        case "!레이드":
            const raidMessage = await joinRaid(param);
            sendMessage(raidMessage);
            break;

        default:
            sendMessage("존재하지 않는 명령어 입니다.");
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
