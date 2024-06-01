const INIT = `CREATE TABLE IF NOT EXISTS entries (
    league_id serial UNIQUE NOT NULL,
    uma_uid varchar(50) UNIQUE NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid)
);`;

module.exports = {
    init: INIT,
};