const INIT = `CREATE TABLE IF NOT EXISTS entries (
    league_id serial NOT NULL,
    uma_uid varchar(50) NOT NULL,
    FOREIGN KEY (league_id) REFERENCES league (league_id),
    FOREIGN KEY (uma_uid) REFERENCES users (uma_uid),
    PRIMARY KEY (league_id, uma_uid)
);`;

const TEST = `
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0101010101010101');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0202020202020202');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0303030303030303');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0404040404040404');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0505050505050505');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0606060606060606');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0707070707070707');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0808080808080808');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '0909090909090909');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1010101010101010');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1111111111111111');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1212121212121212');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1313131313131313');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1414141414141414');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1515151515151515');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1616161616161616');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1717171717171717');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1818181818181818');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '1919191919191919');
    INSERT INTO entries (league_id, uma_uid) VALUES (1, '2020202020202020');
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

module.exports = {
    init: INIT,
    test: TEST,
    select: SELECT,
    create: CREATE,
};