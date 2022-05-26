// Require the necessary discord.js classes
const { token, adminId, clientId, allowChannelId, allowKeyword, gameChannelId, generalChannelId } = require("../config.json");
const { Client, Intents } = require("discord.js");

const { getUserLevel } = require("./command/level");
const { getGoldEmbed } = require("./command/gold");
const { parseCultureCoupon } = require("./command/coupon");
const { getHomework } = require("./command/homework");
const { getBreath, setBreath } = require("./command/breath");
const { calcDutchPay } = require("./command/dutchPay");
const { getMember } = require("./command/member");
const { getRoster } = require("./command/roster");
const { getCharacter } = require("./command/character");
const { getParty } = require("./command/party");
const { getReward } = require("./command/reward");

const PG = require("./dao/index");
const { adminCommand } = require("./command/admin");
const { minigame } = require("./command/minigame");

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

        const isCommand = (keyword = "") => {
            const prefix = "!";
            return message.content.startsWith(`${prefix}${keyword}`);
        };

        // Exit and stop if it's not there
        if (!isCommand()) return;

        const [keyword, ...param] = message.content.split(" ");
        
        if (`!${parseInt(keyword.substring(1))}` === keyword) {
            sendMessage(calcDutchPay([parseInt(keyword.substring(1))]));
            return;
        }

        if (keyword === "!재련" || keyword === "!품질") {
            if(!gameChannelId.includes(message.channelId)) {
                return;
            }

            const noticeCallback = async (text) => {
                const channel = client.channels.cache.get(generalChannelId);

                await channel.send(`[미니게임 공지]\n${message.author.username}님께서 ${text}`);
            }

            return sendMessage(await minigame([keyword, ...param], message.author.id, noticeCallback))
        }

        if (!allowChannelId.includes(message.channelId) && !allowKeyword.includes(keyword.substring(1))) return;

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
                const score = Math.ceil(Math.random() * max);
                sendMessage(`주사위 ${max}\n결과 : ${score}`);
                break;
                
            case "!확률":
                const rate = Math.floor(Math.random() * 101);
                sendMessage(`${param.join(" ")} 확률 : ${rate}%`);
                break;

            case "!선택장애":
                sendMessage(`${param[Math.floor(Math.random() * param.length)]}`);
                break;

            case "!멤버":
                sendMessage(await getMember([...param, message.author.id]));
                break;

            case "!원정대":
                sendMessage(await getRoster(param));
                break;

            case "!캐릭터":
                sendMessage(await getCharacter(param));
                break;

            case "!파티":
                sendMessage(await getParty(param));
                break;

            case "!품앗이":
                sendMessage(await getReward(param));
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
