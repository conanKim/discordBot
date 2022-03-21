const user = require("./user");
const raid = require("./raid");
const character = require("./character");
const party = require("./party");
const partymember = require("./partymember");

const schema = async (pgClient) => {
    console.log(user.init);
    console.log(raid.init);
    console.log(character.init);
    console.log(party.init);
    console.log(partymember.init);

    await pgClient.query(user.init, (err, res) => {
        console.log(err,res);
    });

    await pgClient.query(raid.init, (err, res) => {
        console.log(err,res);
    });

    await pgClient.query(character.init, (err, res) => {
        console.log(err,res);
    });

    await pgClient.query(party.init, (err, res) => {
        console.log(err,res);
    });

    await pgClient.query(partymember.init, (err, res) => {
        console.log(err,res);
    });
}

module.exports = {
    schema: schema
}