const INIT = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    user_name varchar (50) unique not null,
    prefix varchar (1) unique not null
);`;
const CREATE = `INSERT INTO users (user_name, prefix) VALUES ($1, $2);`;
const SELECT = `SELECT * FROM users;`;
const UPDATE = `UPDATE users SET prefix = $1 WHERE user_name = $2;`;
const DELETE = `DELETE FROM users WHERE user_name = $1`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    updatePrefix: UPDATE,
    delete: DELETE,
};
