const INIT = `CREATE TABLE IF NOT EXISTS entries (
    league_id serial UNIQUE NOT NULL,
    uma_uid varchar(50) UNIQUE NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid)
);`;

const SELECT = `SELECT * FROM entries;`
const CREATE = `INSERT INTO entries (league_id, uma_uid) VALUES ($1, $2);`;

module.exports = {
    init: INIT,
    select: SELECT,
    create: CREATE,
};