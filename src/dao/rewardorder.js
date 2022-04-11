const INIT = `CREATE TABLE IF NOT EXISTS rewardorders (
    party_id integer not null,
    reward_name varchar(50) not null,
    user_name varchar(50),
    loot_order integer not null,
    loot_count integer not null,
    FOREIGN KEY (party_id, reward_name) REFERENCES rewards (party_id, reward_name),
    FOREIGN KEY (user_name) REFERENCES users (user_name),
    PRIMARY KEY (party_id, user_name, reward_name)
);

ALTER TABLE rewardorders ALTER COLUMN loot_count SET DEFAULT 0;
`;

const CREATE = `
INSERT INTO rewardorders (party_id, reward_name, user_name, loot_order, loot_count) 
VALUES ($1, $2, $3, $4, 0)
;`;

const SELECT = `SELECT * FROM rewardorders`;
const SELECT_BY_PARTY = `SELECT * FROM rewardorders WHERE party_id = $1;`;
const SELECT_BY_REWARD = `SELECT * FROM rewardorders WHERE party_id = $1 and reward_name = $2 ORDER BY loot_order;`;
const UPDATE_ORDER = `
UPDATE rewardorders
SET loot_order = $4
WHERE party_id = $1 and reward_name = $2 and user_name = $3;
`
const INCREASE_LOOT_COUNT = `
UPDATE rewardorders
SET loot_count = loot_count + 1
WHERE party_id = $1 and reward_name = $2 and user_name = $3;
`
const DELETE = `DELETE FROM rewardorders WHERE party_id = $1 and user_name = $2`;

module.exports = {
    init: INIT,
    create: CREATE,
    list: SELECT,
    listByParty: SELECT_BY_PARTY,
    listByReward: SELECT_BY_REWARD,
    updateOrder: UPDATE_ORDER,
    increaseLootCount: INCREASE_LOOT_COUNT,
    delete: DELETE,
};
