const INIT = `CREATE TABLE IF NOT EXISTS matches (
    league_id serial NOT NULL,
    group_id serial NOT NULL,
    uma_uid varchar(50) NOT NULL,
    is_check_in boolean NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (group_id) REFERENCES groups (group_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid)
);`;

const CREATE = `INSERT INTO matches (league_id, group_id, uma_uid, is_check_in) VALUES ($1, $2, $3, false);`;

const SELECT_BY_LEAGUE = `
SELECT *
FROM matches m, league l, groups g, users u
WHERE
    l.league_id = m.league_id AND
    g.group_id = m.group_id AND
    u.uma_uid = m.uma_uid AND
    l.league_name = $1;
`;

const SELECT_BY_GROUP = `
SELECT *
FROM matches m, league l, groups g, users u
WHERE
    l.league_id = m.league_id AND
    g.group_id = m.group_id AND
    u.uma_uid = m.uma_uid AND
    l.league_name = $1 AND
    g.group_name = $2;
`;

const RESET = `
DELETE FROM matches
USING league
WHERE
    matches.league_id = league.league_id AND
    league.league_name = $1
`;

module.exports = {
    init: INIT,
    create: CREATE,
    selectByLeague: SELECT_BY_LEAGUE,
    selectByGroup: SELECT_BY_GROUP,
    reset: RESET,
};