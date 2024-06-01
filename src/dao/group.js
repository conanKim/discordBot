const INIT = `CREATE TABLE IF NOT EXISTS groups (
    group_id serial UNIQUE NOT NULL,
    league_id serial UNIQUE NOT NULL,
    group_name varchar(50) UNIQUE NOT NULL,
    chat_channel_id varchar(50) UNIQUE NOT NULL,
    winner_uid varchar(50),
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    PRIMARY KEY (group_id, league_id)
);`;

module.exports = {
    init: INIT,
};