const INIT = `CREATE TABLE IF NOT EXISTS minigames (
    discord_id varchar(50) NOT NULL,
    refine_level integer NOT NULL DEFAULT 0,
    try_count integer NOT NULL DEFAULT 0
);
`

const JOIN = `INSERT INTO minigames (discord_id, refine_level, try_count) VALUES ($1, 0, 0);`

const SELECT = `SELECT * FROM minigames WHERE discord_id = $1`
const SELECT_ALL = `SELECT * FROM minigames`

const REFINE_FAILED = `
    UPDATE minigames 
    SET try_count = try_count + 1 
    WHERE discord_id = $1`

const REFINE_SUCCESS = `
    UPDATE minigames 
    SET 
        try_count = 0, 
        refine_level = refine_level + 1 
    WHERE discord_id = $1
`

const REFINE_RESET = `
    UPDATE minigames
    SET 
        try_count = 0,
        refine_level = 0
    WHERE discord_id = $1
`

module.exports = {
    init: INIT,
    join: JOIN,
    select: SELECT,
    selectAll: SELECT_ALL,
    refineFailed: REFINE_FAILED,
    refineSuccess: REFINE_SUCCESS,
    refineReset: REFINE_RESET
};
