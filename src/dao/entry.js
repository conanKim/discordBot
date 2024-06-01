const INIT = `CREATE TABLE IF NOT EXISTS entries (
    league_id serial NOT NULL,
    uma_uid varchar(50) NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid),
    PRIMARY KEY (league_id, uma_uid)
);`;

const SELECT = `
SELECT e.league_id, e.uma_uid, u.user_name
FROM
    entries e,
    users u,
    league l
WHERE
    e.uma_uid = u.uma_uid AND
    e.league_id = l.league_id AND
    l.league_name = $1
;`;

const CREATE = `INSERT INTO entries (league_id, uma_uid) VALUES ($1, $2);`;

module.exports = {
    init: INIT,
    select: SELECT,
    create: CREATE,
};