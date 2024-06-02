const INIT = `CREATE TABLE IF NOT EXISTS users (
    uma_uid varchar(50) UNIQUE NOT NULL,
    user_name varchar(50) UNIQUE NOT NULL,
    discord_id varchar(50) UNIQUE NOT NULL,
    PRIMARY KEY (uma_uid)
);

INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('dummy0000001', '더미01', '더미 디스코드01');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('dummy0000002', '더미02', '더미 디스코드02');
`;

const TEST = `
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('010101010101', '네지트01', '디스코드01');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('020202020202', '네지트02', '디스코드02');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('030303030303', '네지트03', '디스코드03');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('040404040404', '네지트04', '디스코드04');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('050505050505', '네지트05', '디스코드05');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('060606060606', '네지트06', '디스코드06');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('070707070707', '네지트07', '디스코드07');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('080808080808', '네지트08', '디스코드08');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('090909090909', '네지트09', '디스코드09');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('101010101010', '네지트10', '디스코드10');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('111111111111', '네지트11', '디스코드11');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('121212121212', '네지트12', '디스코드12');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('131313131313', '네지트13', '디스코드13');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('141414141414', '네지트14', '디스코드14');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('151515151515', '네지트15', '디스코드15');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('161616161616', '네지트16', '디스코드16');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('171717171717', '네지트17', '디스코드17');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('181818181818', '네지트18', '디스코드18');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('191919191919', '네지트19', '디스코드19');
INSERT INTO users (uma_uid, user_name, discord_id) VALUES ('202020202020', '네지트20', '디스코드20');
`;

const SELECT = `SELECT * FROM users;`
const CREATE = `INSERT INTO users (uma_uid, user_name, discord_id) VALUES ($2, $1, $3);`;

module.exports = {
    init: INIT,
    test: TEST,
    select: SELECT,
    create: CREATE,
};
