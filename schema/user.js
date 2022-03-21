const createTable = `CREATE TABLE IF NOT EXIST user (
    user_id serial PRIMARY KEY,
    name varchar (50) unique not null,
)`

module.exports = {
    init: createTable
}