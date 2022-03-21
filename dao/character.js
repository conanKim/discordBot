const INIT = `CREATE TABLE IF NOT EXISTS characters (
    char_name varchar(50) UNIQUE NOT NULL,
    char_level integer NOT NULL,
    user_name varchar(50) UNIQUE NOT NULL,
    class_name varchar(50) UNIQUE NOT NULL,
    FOREIGN KEY (user_name) REFERENCES users (user_name),
    FOREIGN KEY (class_name) REFERENCES classes (class_name),
    PRIMARY KEY (char_name)
);`;

const CREATE = `INSERT INTO characters (user_name, char_name, class_name, char_level) VALUES ($1, $2, $3, $4);`;
const SELECT = `SELECT * FROM characters WHERE user_name = $1;`;
const UPDATE = `UPDATE characters SET char_level = $2 WHERE char_name = $1;`;
const DELETE = `DELETE FROM characters WHERE char_name = $1`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    update: UPDATE,
    delete: DELETE,
};
