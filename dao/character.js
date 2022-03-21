const createTable = `CREATE TABLE IF NOT EXISTS characters (
    char_id serial,
    user_id integer NOT NULL,
    name varchar (50) unique not null,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    PRIMARY KEY (char_id, user_id)
);`;

const create = `INSERT INTO users (name, prefix) VALUES ($1, $2);`;
const select = `SELECT * FROM users;`;
const updatePrefix = `UPDATE users SET prefix = $1 WHERE name = $2;`;
const deleteUser = `DELETE FROM users WHERE name = $1`;

module.exports = {
    init: createTable,
};
