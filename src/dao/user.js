const INIT = `CREATE TABLE IF NOT EXISTS users (
    prefix varchar (1) unique not null,
    user_name varchar (50) unique not null,
    PRIMARY KEY (prefix)
);

ALTER TABLE users ADD COLUMN discord_id varchar(50);
`;

const CREATE = `INSERT INTO users (user_name, prefix) VALUES ($1, $2);`;
const SELECT = `SELECT * FROM users;`;
const UPDATE = `UPDATE users SET prefix = $1 WHERE user_name = $2;`;
const DELETE = `DELETE FROM users WHERE user_name = $1`;
const AUTHENTICATE = `UPDATE users SET discord_id = $2 WHERE user_name = $1`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    updatePrefix: UPDATE,
    authenticate: AUTHENTICATE,
    delete: DELETE,
};
