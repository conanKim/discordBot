const INIT = `CREATE TABLE IF NOT EXISTS matches (
    league_id serial UNIQUE NOT NULL,
    group_id serial UNIQUE NOT NULL,
    uma_uid varchar(50) UNIQUE NOT NULL,
    is_check_in boolean UNIQUE NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid)
);`;

const CREATE = `INSERT INTO entries (league_id, group_id, uma_uid) VALUES ($1, $2, $3, false);`;

const RESET = `
DELETE FROM entries
USING league
WHERE
    entries.league_id = league.league_id AND
    league.league_name = $1
`;

module.exports = {
    init: INIT,
    create: CREATE,
    reset: RESET,
};