const INIT = `CREATE TABLE IF NOT EXISTS users (
    uma_uid varchar(50) UNIQUE NOT NULL,
    user_name varchar(50) UNIQUE NOT NULL,
    discord_id varchar(50) UNIQUE NOT NULL,
    PRIMARY KEY (uma_uid)
);`;

module.exports = {
    init: INIT,
};