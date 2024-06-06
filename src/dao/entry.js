const INIT = `CREATE TABLE IF NOT EXISTS entries (
    league_id serial NOT NULL,
    uma_uid varchar(50) NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid),
    PRIMARY KEY (league_id, uma_uid)
);`;

const TEST = `
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '010101010101');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '020202020202');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '030303030303');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '040404040404');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '050505050505');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '060606060606');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '070707070707');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '080808080808');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '090909090909');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '101010101010');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '111111111111');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '121212121212');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '131313131313');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '141414141414');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '151515151515');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '161616161616');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '171717171717');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '181818181818');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '191919191919');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '202020202020');
`;

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

export default {
    init: INIT,
    test: TEST,
    select: SELECT,
    create: CREATE,
};