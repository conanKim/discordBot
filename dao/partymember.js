const createTable = `CREATE TABLE IF NOT EXISTS partymembers (
    party_id integer not null,
    charactor_id integer not null
);`

module.exports = {
    init: createTable
}