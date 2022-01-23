// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const { getUserLevel } = require("./command/level");
const { getGoldEmbed } = require("./command/gold");
const { parseCultureCoupon } = require("./command/coupon");
const { getHomework } = require("./command/homework");
const { getBreath, setBreath } = require("./command/breath");

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

    const sendMessage = (str = "") => {
        message.reply(str);
    };

    // Exit and stop if it's not there
    if (!isCommand()) return;

    const [keyword, ...param] = message.content.split(" ");
    switch (keyword) {
        case "!ping":
            sendMessage("pong!");
            break;

        case "!help":
        case "!command":
            sendMessage("주사위, 엔빵, 레벨 [이름], 골드");
            break;

        case "!엔빵":
        case "!n":
        case "!N":
        case "!ㅜ":
            const price = param[0];
            const n = param[1] || 8;
            const sellPrice = Math.round((price * 0.95 * (n - 1)) / n);
            let priceMsg = `${price}골 ${n}인빵\n`;
            priceMsg += `균등가 : ${sellPrice}\n`;
            priceMsg += `선점가 : ${Math.round(sellPrice / 1.1)}`;

            sendMessage(priceMsg);
            break;

        case "!주사위":
            const max = param[0] || 100;
            sendMessage(`주사위 ${max}\n결과 : ${Math.floor(Math.random() * max)}`);
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

        default:
            sendMessage("존재하지 않는 명령어 입니다.");
    }
});

// Login to Discord with your client's token
client.login(token);
