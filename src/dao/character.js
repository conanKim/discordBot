const INIT = `CREATE TABLE IF NOT EXISTS characters (
    char_name varchar(50) UNIQUE NOT NULL,
    char_level integer NOT NULL,
    user_name varchar(50) NOT NULL,
    class_name varchar(50) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES users (user_name),
    FOREIGN KEY (class_name) REFERENCES classes (class_name),
    PRIMARY KEY (char_name)
);`;

const CREATE = `INSERT INTO characters (user_name, char_name, class_name, char_level) VALUES ($1, $2, $3, 0);`;
const SELECT = `
SELECT *
FROM characters crt, classes c
WHERE crt.user_name = $1 and crt.class_name = c.class_name;
`;
const UPDATE = `
INSERT INTO 
    characters (user_name, char_name, class_name, char_level) 
    VALUES ($1, $2, $3, $4)
ON CONFLICT (char_name)
DO UPDATE
SET (class_name, char_level) = (excluded.class_name, excluded.char_level)
`;
const DELETE = `DELETE FROM characters WHERE char_name = $1`;

const RANK = `
SELECT *
FROM characters crt, classes c, users u
WHERE crt.user_name = u.user_name AND crt.class_name = c.class_name
ORDER BY crt.char_level DESC;
`;
module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    rank: RANK,
    update: UPDATE,
    delete: DELETE,
};
