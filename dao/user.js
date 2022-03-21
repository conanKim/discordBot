const createTable = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    name varchar (50) unique not null,
    prefix varchar (1) unique not null
);`
const create = `INSERT INTO users (name, prefix) VALUES ($1, $2);`
const select = `SELECT * FROM users;`
const updatePrefix = `UPDATE users SET prefix = $1 WHERE name = $2;`
const deleteUser = `DELETE FROM users WHERE name = $1`

module.exports = {
    init: createTable,
    create: create,
    list: select,
    updatePrefix: updatePrefix,
    delete: deleteUser,
}