const { Client } = require("pg");
const { database } = require("../../config.json");
let client;

const user = require("./user");

const connect = async () => {
    client = new Client(database);
    await client.connect();

    await schema();
};

const schema = async () => {
    await client.query(admin.init, (err, res) => {
        console.log(err, res);
    });
    await client.query(user.init, (err, res) => {
        console.log(err, res);
    });

    console.log("SCHEMA DONE");
};

const query = (query, params) => {
    console.log(`QUERY : ${query}`)
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
