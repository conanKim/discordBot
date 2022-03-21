const { Client: PGClient } = require("pg");
const { database } = require("../config.json");
let pgClient;

const user = require("./user");
const raid = require("./raid");
const classes = require("./class");
const character = require("./character");
const party = require("./party");
const partymember = require("./partymember");

const connect = async () => {
    pgClient = new PGClient(database);
    await pgClient.connect();

    await schema();
};

const schema = async () => {
    await pgClient.query(user.init, (err, res) => {
        console.log(err, res);
    });

    await pgClient.query(raid.init, (err, res) => {
        console.log(err, res);
    });

    await pgClient.query(classes.init, (err, res) => {
        console.log(err, res);
    });

    await pgClient.query(character.init, (err, res) => {
        console.log(err, res);
    });

    await pgClient.query(party.init, (err, res) => {
        console.log(err, res);
    });

    await pgClient.query(partymember.init, (err, res) => {
        console.log(err, res);
    });
};

const query = async (query, params) => {
    return new Promise((resolve, reject) => {
        try {
            return pgClient.query(query, params, (err, res) => {
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
    client: pgClient,
    query: query,
    connect: connect,
    schema: schema,
};
