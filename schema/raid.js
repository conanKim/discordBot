const createTable = `CREATE TABLE IF NOT EXIST raid (
    raid_id serial PRIMARY KEY,
    name varchar (50) not null,
    personnel integer not null,
)`

module.exports = {
    init: createTable
}