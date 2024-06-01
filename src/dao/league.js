const INIT = `CREATE TABLE IF NOT EXISTS users (
    league_id serial UNIQUE NOT NULL,
    league_name varchar(50) UNIQUE NOT NULL,
    league_date varchar(50) UNIQUE NOT NULL,
    join_date_limit varchar(50) UNIQUE NOT NULL,
    user_count_limit integer UNIQUE NOT NULL,
    PRIMARY KEY (uma_uid)
);`;

module.exports = {
    init: INIT,
};