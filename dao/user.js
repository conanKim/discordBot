const INIT = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    name varchar (50) unique not null,
    prefix varchar (1) unique not null
);`;
const CREATE = `INSERT INTO users (name, prefix) VALUES ($1, $2);`;
const SELECT = `SELECT * FROM users;`;
const UPDATE = `UPDATE users SET prefix = $1 WHERE name = $2;`;
const DELETE = `DELETE FROM users WHERE name = $1`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    updatePrefix: UPDATE,
    delete: DELETE,
};
