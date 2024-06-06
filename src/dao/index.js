import PG from "pg";
import config from "../../config.json";

import league from "./league.js";
import user from "./user.js";
import group from "./group.js";
import match from "./match.js";
import entry from "./entry.js";

const { Client } = PG;
let client;

const connect = async () => {
    client = new Client(config.database);
    await client.connect();

    await schema();
};

const schema = async () => {
    await client.query(league.init, (err, res) => {
        console.log(league.init, err, res);
    });
    await client.query(user.init, (err, res) => {
        console.log(user.init, err, res);
    });
    await client.query(group.init, (err, res) => {
        console.log(group.init, err, res);
    });
    await client.query(match.init, (err, res) => {
        console.log(match.init, err, res);
    });
    await client.query(entry.init, (err, res) => {
        console.log(entry.init, err, res);
    });

    console.log("SCHEMA DONE");
};

const test = async () => {
    await client.query(league.test, (err, res) => {
        console.log(league.init, err, res);
    });
    await client.query(user.test, (err, res) => {
        console.log(user.init, err, res);
    });
    await client.query(entry.test, (err, res) => {
        console.log(entry.init, err, res);
    });

    console.log("TEST DATA DONE");
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

export default {
    client: client,
    query: query,
    connect: connect,
    schema: schema,
    test: test,
};
