const INIT = `CREATE TABLE IF NOT EXISTS league (
    league_id serial UNIQUE NOT NULL,
    league_name varchar(50) UNIQUE NOT NULL,
    league_date varchar(50) UNIQUE NOT NULL,
    join_date_limit varchar(50) UNIQUE NOT NULL,
    user_count_limit integer UNIQUE NOT NULL,
    PRIMARY KEY (league_id)
);`;

const TEST = `
INSERT INTO league (league_name, league_date, join_date_limit, user_count_limit)
VALUES ('네지트배', '2024-06-30', '2024-06-20', 81);
`;

const SELECT = `SELECT * FROM league;`
const CREATE = `INSERT INTO league (league_name, league_date, join_date_limit, user_count_limit) VALUES ($1, $2, $3, $4);`;

module.exports = {
    init: INIT,
    test: TEST,
    select: SELECT,
    create: CREATE,
};