const INIT = `CREATE TABLE IF NOT EXISTS matches (
    league_id serial UNIQUE NOT NULL,
    group_id serial UNIQUE NOT NULL,
    uma_uid varchar(50) UNIQUE NOT NULL,
    is_check_in boolean UNIQUE NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid)
);`;

module.exports = {
    init: INIT,
};