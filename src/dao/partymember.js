const INIT = `CREATE TABLE IF NOT EXISTS partymembers (
    party_id integer not null,
    char_name varchar(50),
    user_name varchar(50),
    FOREIGN KEY (party_id) REFERENCES parties (party_id),
    FOREIGN KEY (char_name) REFERENCES characters (char_name),
    FOREIGN KEY (user_name) REFERENCES users (user_name),
    PRIMARY KEY (party_id, user_name, char_name)
);`;

const UPDATE_TABLE = `
    ALTER TABLE partymembers ADD COLUMN user_name varchar(50) REFERENCES users (user_name);
    ALTER TABLE partymembers ALTER COLUMN char_name DROP NOT NULL;
`

const CREATE = `INSERT INTO partymembers (party_id, char_name) VALUES ($1, $2);`;
const CREATE_EXPEDITION = `INSERT INTO partymembers (party_id, user_name) VALUES ($1, $2);`;
const SELECT = `SELECT * FROM partymembers`;
const SELECT_BY_PARTY = `SELECT * FROM partymembers WHERE party_id = $1;`;
const SELECT_BY_CHAR = `SELECT * FROM partymembers WHERE char_name = $1;`;
const SELECT_BY_MEMBER = `SELECT * FROM partymembers WHERE char_name = $1;`;
const DELETE = `DELETE FROM partymembers WHERE party_id = $1 and char_name = $2`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    listByParty: SELECT_BY_PARTY,
    listByChar: SELECT_BY_CHAR,
    listByMember: SELECT_BY_MEMBER,
    delete: DELETE,
};
