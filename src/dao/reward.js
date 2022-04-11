const INIT = `CREATE TABLE IF NOT EXISTS rewards (
    reward_name varchar(50) not null,
    party_id integer NOT NULL,
    FOREIGN KEY (party_id) REFERENCES parties (party_id),

    PRIMARY KEY (reward_name, party_id)
);`

const CREATE = `
    INSERT INTO rewards (party_id, reward_name) 
    VALUES ($1, $2);
;`

const SELECT = `
    SELECT *
    FROM rewards;
`

const SELECT_BY_PARTY = `
    SELECT *
    FROM rewards
    WHERE party_id = $1;
`

const SELECT_BY_REWARD = `
    SELECT *
    FROM rewards
    WHERE party_id = $1 and reward_name = $2;
`

const UPDATE_REWARD = `
    UPDATE rewards
    SET reward_name = $3
    WHERE party_id = $1 and reward_name = $2;
`

const DELETE = `
    DELETE FROM rewards
    WHERE party_id = $1 and reward_name = $2;
`

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    listByParty: SELECT_BY_PARTY,
    listByReward: SELECT_BY_REWARD,
    updateReward: UPDATE_REWARD,
    delete: DELETE,
};
