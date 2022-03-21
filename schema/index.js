const user = require("./user");
const raid = require("./raid");
const character = require("./character");
const party = require("./party");
const partymember = require("./partymember");

const connectDB = () => {
    console.log(user.init);
    console.log(raid.init);
    console.log(character.init);
    console.log(party.init);
    console.log(partymember.init);    
}

module.exports = {
    connectDB: connectDB
}