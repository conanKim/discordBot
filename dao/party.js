const createTable = `CREATE TABLE IF NOT EXISTS parties (
    party_id serial PRIMARY KEY,
    raid_id integer not null,
    difficulty varchar(10) not null,
    FOREIGN KEY (raid_id) REFERENCES raid (raid_id)
)`

module.exports = {
    init: createTable
}