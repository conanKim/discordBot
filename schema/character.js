const createTable = `CREATE TABLE IF NOT EXIST character (
    char_id serial,
    user_id integer NOT NULL,
    name varchar (50) unique not null,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    PRIMARY KEY (char_id, user_id),
)`

module.exports = {
    init: createTable
}