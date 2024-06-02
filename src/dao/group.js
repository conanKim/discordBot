const INIT = `CREATE TABLE IF NOT EXISTS groups (
    group_id serial NOT NULL,
    league_id serial NOT NULL,
    group_name varchar(50) UNIQUE NOT NULL,
    chat_channel_id varchar(50) UNIQUE NOT NULL,
    winner_uid varchar(50),
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    PRIMARY KEY (group_id, league_id)
);`;

const CREATE = `INSERT INTO groups (league_id, group_name, chat_channel_id) VALUES ($1, $2, $3, false);`;

const RESET = `
DELETE FROM groups
USING league
WHERE
    groups.league_id = league.league_id AND
    league.league_name = $1
`;

module.exports = {
    init: INIT,
    create: CREATE,
    reset: RESET,
};