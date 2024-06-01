const INIT = `CREATE TABLE IF NOT EXISTS users (
    uma_uid varchar(50) UNIQUE NOT NULL,
    user_name varchar(50) UNIQUE NOT NULL,
    discord_id varchar(50) UNIQUE NOT NULL,
    PRIMARY KEY (uma_uid)
);`;

const SELECT = `SELECT * FROM users;`
const CREATE = `INSERT INTO users (uma_uid, user_name, discord_id) VALUES ($2, $1, $3);`;

module.exports = {
    init: INIT,
    select: SELECT,
    create: CREATE,
};