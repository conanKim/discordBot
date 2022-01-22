// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const axios = require("axios");
const cheerio = require("cheerio");

// Create a new client instance
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
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

    // Exit and stop if it's not there
    if (!isCommand()) return;

    // The back ticks are Template Literals introduced in Javascript in ES6 or ES2015, as an replacement for String Concatenation Read them up here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    if (isCommand("ping")) {
        message.channel.send("pong!");
    } else if (isCommand("레벨")) {
        const nickname = message.content.split(" ")[1];
        if (!nickname) {
            return message.channel.send(
                "캐릭터명이 입력되지 않았습니다. [!레벨 캐릭터명] 으로 입력해주세요."
            );
        }

        const encodeNickName = encodeURI(nickname);
        const html = await axios.get(
            `https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`
        );
        const $ = cheerio.load(html.data);
        const userName = $("span.profile-character-info__name").text();
        const level = $(
            "div.level-info2>div.level-info2__item span:nth-of-type(2)"
        ).text();

        const job = $("img.profile-character-info__img").attr("alt");
        if (!userName) {
            return message.channel.send("존재하지 않는 캐릭터입니다.");
        }
        await message.channel.send(
            `${userName}의 달성 아이템 레벨은 ${level}이고 직업은 ${job}입니다.`
        );

        console.log(
            `로스트아크 전투정보실에서 가져온 닉네임 이름은 <${userName}> 입니다.`
        );
    }
});

// Login to Discord with your client's token
client.login(token);
