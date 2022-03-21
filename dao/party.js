const INIT = `CREATE TABLE IF NOT EXISTS parties (
    party_id serial not null,
    raid_nickname varchar(10) not null,
    difficulty varchar(10),
    FOREIGN KEY (raid_nickname) REFERENCES raids (raid_nickname),
    PRIMARY KEY (party_id)
);`;

const CREATE = `INSERT INTO parties (raid_nickname, difficulty) VALUES ($1, $2);`;
const SELECT = `SELECT * FROM parties`;
const SELECT_BY_RAID = `SELECT * FROM parties WHERE raid_nickname = $1;`;
const UPDATE = `UPDATE parties SET difficulty = $2 WHERE party_id = $1;`;
const DELETE = `DELETE FROM parties WHERE party_id = $1`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    listByRaid: SELECT_BY_RAID,
    update: UPDATE,
    delete: DELETE,
};
