const INIT = `CREATE TABLE IF NOT EXISTS minigames (
    discord_id varchar(50) NOT NULL,
    refine_level integer NOT NULL DEFAULT 0,
    try_count integer NOT NULL DEFAULT 0,
    last_execute_time varchar(50) DEFAULT '0'
);

ALTER TABLE minigames ADD COLUMN last_execute_time varchar(50);
ALTER TABLE minigames ADD CONSTRAINT discord_id PRIMARY KEY(discord_id);
`

const JOIN = `INSERT INTO minigames (discord_id, refine_level, try_count, last_execute_time) VALUES ($1, 0, 0, '0');`

const SELECT = `SELECT * FROM minigames WHERE discord_id = $1`
const SELECT_ALL = `SELECT * FROM minigames mg, users u WHERE mg.discord_id = u.discord_id`

const REFINE_FAILED = `
    UPDATE minigames 
    SET 
        try_count = try_count + 1,
        last_execute_time = $2
    WHERE discord_id = $1`

const REFINE_SUCCESS = `
    UPDATE minigames 
    SET 
        try_count = 0, 
        refine_level = refine_level + 1,
        last_execute_time = $2
    WHERE discord_id = $1
`

const REFINE_RESET = `
    UPDATE minigames
    SET 
        try_count = 0,
        refine_level = 0,
        last_execute_time = $2
    WHERE discord_id = $1
`

const REFINE_DELTE = `
    DELETE FROM minigames WHERE discord_id = $1
`

module.exports = {
    init: INIT,
    join: JOIN,
    select: SELECT,
    selectAll: SELECT_ALL,
    refineFailed: REFINE_FAILED,
    refineSuccess: REFINE_SUCCESS,
    refineReset: REFINE_RESET,
    delete: REFINE_DELTE
};
