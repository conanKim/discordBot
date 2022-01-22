// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { getUserLevel } = require("./command/level");
const { getGoldEmbed } = require("./command/gold");
const { parseCultureCoupon } = require("./command/coupon");

// Create a new client instance
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");
});

client.on("messageCreate", async (message) => {
    const isCommand = (keyword = "") => {
        const prefix = "!";
        return message.content.startsWith(`${prefix}${keyword}`);
    };

    const sendMessage = (str) => {
        message.reply(str);
    };

    // Exit and stop if it's not there
    if (!isCommand()) return;

    const [keyword, ...param] = message.content.split(" ");
    switch (keyword) {
        case "!ping":
            sendMessage("pong!");
            break;

        case "!레벨":
            const msg = await getUserLevel(param[0]);
            sendMessage(msg);
            break;

        case "!골드":
            const embed = getGoldEmbed();
            sendMessage(embed);
            break;

        case "!문상":
            const result = parseCultureCoupon(param);
            sendMessage(result);
            break;

        default:
            return sendMessage("존재하지 않는 명령어 입니다.");
    }
});

// Login to Discord with your client's token
client.login(token);
