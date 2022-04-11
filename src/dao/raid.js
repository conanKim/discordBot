const INIT = `CREATE TABLE IF NOT EXISTS raids (
    raid_name varchar (50) not null,
    raid_nickname varchar (10) unique not null,
    personnel integer not null,
    is_expedition boolean,
    PRIMARY KEY (raid_nickname)
);

ALTER TABLE raids ALTER COLUMN is_expedition SET DEFAULT false;

INSERT INTO raids VALUES ('카양겔', '카양겔', 4, false);
INSERT INTO raids VALUES ('아브렐슈드', '아브', 8, false);
INSERT INTO raids VALUES ('쿠크세이튼', '쿠크', 4, false);
INSERT INTO raids VALUES ('비아키스', '비아', 8, false);
INSERT INTO raids VALUES ('발탄', '발탄', 8, false);
INSERT INTO raids VALUES ('도비스', '도비스', 4, true);
`;

const UPDATE_TABLE = `
ALTER TABLE raids ADD COLUMN IF NOT EXISTS is_expedition boolean;
ALTER TABLE raids ALTER COLUMN is_expedition SET DEFAULT false;

UPDATE raids SET is_expedition = false WHERE raid_nickname != '도비스';

INSERT INTO raids VALUES ('도비스', '도비스', 4, true)
ON CONFLICT (raid_nickname)
DO UPDATE
SET (raid_nickname, is_expedition) = (excluded.raid_nickname, excluded.is_expedition)
`

module.exports = {
    init: INIT,
    updateTable: UPDATE_TABLE
};
