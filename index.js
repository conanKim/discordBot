// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");

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

client.on("messageCreate", (message) => {
    const isCommand = (keyword = "") => {
        const prefix = "!";
        return message.content.startsWith(`${prefix}${keyword}`);
    };

    // Exit and stop if it's not there
    if (!isCommand()) return;

    // The back ticks are Template Literals introduced in Javascript in ES6 or ES2015, as an replacement for String Concatenation Read them up here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    if (isCommand("ping")) {
        message.channel.send("pong!");
    } else if (isCommand("foo")) {
        message.channel.send("bar!");
    }
});

// Login to Discord with your client's token
client.login(token);
