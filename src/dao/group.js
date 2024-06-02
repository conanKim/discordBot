const INIT = `CREATE TABLE IF NOT EXISTS groups (
    group_id serial UNIQUE NOT NULL,
    league_id serial NOT NULL,
    group_name varchar(50) NOT NULL,
    chat_channel_id varchar(50) UNIQUE NOT NULL,
    winner_uid varchar(50),
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    PRIMARY KEY (group_id, league_id)
);`;

const CREATE = `INSERT INTO groups (league_id, group_name, chat_channel_id) VALUES ($1, $2, $3);`;

const SELECT_BY_LEAGUE = `
SELECT *
FROM league l, groups g
WHERE
    l.league_id = g.league_id AND
    l.league_id = $1 AND
    g.group_name = $2
;`

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
    selectByLeague: SELECT_BY_LEAGUE,
    reset: RESET,
};
