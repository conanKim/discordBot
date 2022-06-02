const INIT = `CREATE TABLE IF NOT EXISTS users (
    prefix varchar (1) unique not null,
    user_name varchar (50) unique not null,
    PRIMARY KEY (prefix)
);

ALTER TABLE users ADD COLUMN discord_id varchar(50);
`;

const CREATE = `INSERT INTO users (user_name, prefix) VALUES ($1, $2);`;
const SELECT = `SELECT * FROM users;`;
const SELECT_BY_DISCORD_ID = `SELECT * FROM users WHERE discord_id = $1`;
const UPDATE = `UPDATE users SET prefix = $1 WHERE user_name = $2;`;
const DELETE = `DELETE FROM users WHERE user_name = $1`;
const AUTHENTICATE = `UPDATE users SET discord_id = $2 WHERE user_name = $1`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    selectByDiscordId: SELECT_BY_DISCORD_ID,
    updatePrefix: UPDATE,
    authenticate: AUTHENTICATE,
    delete: DELETE,
};
