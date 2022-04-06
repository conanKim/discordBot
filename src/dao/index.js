const { Client } = require("pg");
const { database } = require("../../config.json");
let client;

const user = require("./user");
const raid = require("./raid");
const classes = require("./class");
const character = require("./character");
const party = require("./party");
const partymember = require("./partymember");

const connect = async () => {
    client = new Client(database);
    await client.connect();

    await schema();
};

const schema = async () => {
    await client.query(user.init, (err, res) => {
        console.log(err, res);
    });

    await client.query(raid.init, (err, res) => {
        console.log(err, res);
    });

    await client.query(classes.init, (err, res) => {
        console.log(err, res);
    });

    await client.query(character.init, (err, res) => {
        console.log(err, res);
    });

    await client.query(party.init, (err, res) => {
        console.log(err, res);
    });

    await client.query(partymember.init, (err, res) => {
        console.log(err, res);
    });

    await client.query(classes.update, (err, res) => {
        console.log(err, res);
    })

    console.log("SCHEMA DONE");
};

const query = (query, params) => {
    return new Promise((resolve, reject) => {
        try {
            return client.query(query, params, (err, res) => {
                if (res) {
                    resolve(res.rows);
                } else {
                    console.log(err);
                    reject(err);
                }
            });
        } catch (e) {
            reject("알수 없는 에러가 발생했습니다.");
        }
    });
};

module.exports = {
    client: client,
    query: query,
    connect: connect,
    schema: schema,
};
