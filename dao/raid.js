const createTable = `CREATE TABLE IF NOT EXISTS raids (
    raid_name varchar (50) not null,
    raid_nickname varchar (10) unique not null,
    personnel integer not null,
    PRIMARY KEY (raid_nickname)
);

INSERT INTO raids VALUES ('카양겔', '카양겔', 4);
INSERT INTO raids VALUES ('아브렐슈드', '아브', 8);
INSERT INTO raids VALUES ('쿠크세이튼', '쿠크', 4);
INSERT INTO raids VALUES ('비아키스', '비아', 8);
INSERT INTO raids VALUES ('발탄', '발탄', 8);
`;

module.exports = {
    init: createTable,
};
