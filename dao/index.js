const user = require("./user");
const raid = require("./raid");
const character = require("./character");
const party = require("./party");
const partymember = require("./partymember");

const schema = (pgClient) => {
    console.log(user.init);
    console.log(raid.init);
    console.log(character.init);
    console.log(party.init);
    console.log(partymember.init);

    pgClient.query(user.init, (err, res) => {
        console.log(err,res);
    });
}

module.exports = {
    schema: schema
}