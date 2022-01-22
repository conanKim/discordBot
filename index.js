// Require the necessary discord.js classes
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token } = require("./config.json");
const axios = require("axios");
const cheerio = require("cheerio");

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
        message.channel.send(str);
    };

    // Exit and stop if it's not there
    if (!isCommand()) return;

    const [keyword, ...param] = message.content.split(" ");
    switch (keyword) {
        case "!ping":
            sendMessage("pong!");
            break;
        case "!레벨":
            const nickName = param[0];
            if (!nickName) {
                return sendMessage("캐릭터명이 입력되지 않았습니다. [!레벨 캐릭터명] 으로 입력해주세요.");
            }

            const encodeNickName = encodeURI(nickName);
            const html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
            const $ = cheerio.load(html.data);
            const userName = $("span.profile-character-info__name").text();
            const level = $("div.level-info2>div.level-info2__item span:nth-of-type(2)").text();

            const job = $("img.profile-character-info__img").attr("alt");
            console.log(`캐릭터조회 : ${userName}`);

            if (!userName) {
                return sendMessage("존재하지 않는 캐릭터입니다.");
            }

            sendMessage(`${userName}의 달성 아이템 레벨은 ${level}이고 직업은 ${job}입니다.`);

            break;
        case "!골드":
            const exampleEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setAuthor({
                    name: "컨텐츠 별 골드 보상",
                })
                .addFields(
                    { name: "발탄 노말", value: "2500 (500 + 2000)" },
                    { name: "비아키스 노말", value: "2500 (500 + 600 + 1400)" },
                    { name: "발탄 하드", value: "4500 (1000 + 3500)" },
                    { name: "비아키스 노말", value: "4500 (1000 + 1000 + 2500)" },
                    { name: "쿠크세이튼 노말", value: "4500 (1000 + 1000 + 2500)" },
                    { name: "아브렐슈드 노말", value: "8500 (4500 + 1500 + 2500)" },
                    { name: "아브렐슈드 하드", value: "10500 (5500 + 2000 + 3000)" }
                );

            message.channel.send({ embeds: [exampleEmbed] });
            break;

        case "!문상":
            const result = param.reduce((prev, curr, index) => {
                prev += `${curr.substring(0, 4)}\t`;
                prev += `${curr.substring(4, 8)}\t`;
                prev += `${curr.substring(8, 12)}\t`;
                prev += `${curr.substring(13, 19)}\n`;
                if ((index + 1) % 5 === 0) {
                    prev += `\n`;
                }
                return prev;
            }, "");
            sendMessage(result);
            break;
        default:
            return sendMessage("존재하지 않는 명령어 입니다.");
    }
});

// Login to Discord with your client's token
client.login(token);
