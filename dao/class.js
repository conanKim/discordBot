const INIT = `CREATE TABLE IF NOT EXISTS classes (
    class_name varchar(50) NOT NULL,
    class_nickname varchar(4) NOT NULL,
    root_class varchar(50) NOT NULL,
    type varchar(50) NOT NULL,

    PRIMARY KEY (class_name)
);

INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('버서커', '서커', '전사', '딜러', '<:class_destroyer:934859881461215302>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('디스트로이어', '디붕', '전사', '딜러', '<:class_warlord:934859881045966920>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('워로드', '워붕', '전사', '딜러', '<:class_battlemaster:934859881457020988>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('배틀마스터', '배마', '무도가', '딜러', '<:class_berserker:934859881293434941>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('인파이터', '인파', '무도가', '딜러', '<:class_infighter:934859881461207061>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('기공사', '기공', '무도가', '딜러', '<:class_soulmaster:934859881503137832>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('창술사', '창술', '무도가', '딜러', '<:class_lancemaster:934859881977098290>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('스트라이커', '스커', '무도가', '딜러', '<:class_striker:934859881683496980>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('데빌헌터', '데헌', '헌터', '딜러', '<:class_devilhunter:934859881448636486>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('블래스터', '밥통', '헌터', '딜러', '<:class_blaster:934859881259868201>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('호크아이', '호크', '헌터', '딜러', '<:class_hawkeye:934859881289232405>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('스카우터', '스카', '헌터', '딜러', '<:class_scouter:934859881545076746>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('건슬링어', '건슬', '헌터', '딜러', '<:class_gunslinger:934859881524125736>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('아르카나', '알카', '마법사', '딜러', '<:class_arcana:934859881603817482>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('서머너', '머너', '마법사', '딜러', '<:class_summoner:934859881507323964>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('소서리스', '소서', '마법사', '딜러', '<:class_sorceress:934859881389916181>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('데모닉', '모닉', '암살자', '딜러', '<:class_demonic:934859881733845022>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('블레이드', '블레', '암살자', '딜러', '<:class_blade:934859881469587518>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('리퍼', '리퍼', '암살자', '딜러', '<:class_reaper:934859881452810311>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('바드', '바드', '마법사', '서포터', '<:class_bard:934859881134043197>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('홀리나이트', '홀나', '전사', '서포터', '<:class_holyknight:934859881494765658>');
INSERT INTO classes (class_name, class_nickname, root_class, type, emoji) VALUES ('도화가', '아가', '스페셜리스트', '서포터', '<:class_artist:934859881519923250>');
`;

const UPDATE = `
ALTER TABLE classes ADD COLUMN emoji varchar(50);


UPDATE classes SET emoji='<:class_destroyer:934859881461215302>' WHERE class_name = '디스트로이어';
UPDATE classes SET emoji='<:class_warlord:934859881045966920>' WHERE class_name = '워로드';
UPDATE classes SET emoji='<:class_battlemaster:934859881457020988>' WHERE class_name = '배틀마스터';
UPDATE classes SET emoji='<:class_berserker:934859881293434941>' WHERE class_name = '버서커';
UPDATE classes SET emoji='<:class_infighter:934859881461207061>' WHERE class_name = '인파이터';
UPDATE classes SET emoji='<:class_soulmaster:934859881503137832>' WHERE class_name = '기공사';
UPDATE classes SET emoji='<:class_lancemaster:934859881977098290>' WHERE class_name = '창술사';
UPDATE classes SET emoji='<:class_striker:934859881683496980>' WHERE class_name = '스트라이커';
UPDATE classes SET emoji='<:class_devilhunter:934859881448636486>' WHERE class_name = '데빌헌터';
UPDATE classes SET emoji='<:class_blaster:934859881259868201>' WHERE class_name = '블래스터';
UPDATE classes SET emoji='<:class_hawkeye:934859881289232405>' WHERE class_name = '호크아이';
UPDATE classes SET emoji='<:class_scouter:934859881545076746>' WHERE class_name = '스카우터';
UPDATE classes SET emoji='<:class_gunslinger:934859881524125736>' WHERE class_name = '건슬링어';
UPDATE classes SET emoji='<:class_arcana:934859881603817482>' WHERE class_name = '아르카나';
UPDATE classes SET emoji='<:class_summoner:934859881507323964>' WHERE class_name = '서머너';
UPDATE classes SET emoji='<:class_sorceress:934859881389916181>' WHERE class_name = '소서리스';
UPDATE classes SET emoji='<:class_demonic:934859881733845022>' WHERE class_name = '데모닉';
UPDATE classes SET emoji='<:class_blade:934859881469587518>' WHERE class_name = '블레이드';
UPDATE classes SET emoji='<:class_reaper:934859881452810311>' WHERE class_name = '리퍼';
UPDATE classes SET emoji='<:class_bard:934859881134043197>' WHERE class_name = '바드';
UPDATE classes SET emoji='<:class_holyknight:934859881494765658>' WHERE class_name = '홀리나이트';
UPDATE classes SET emoji='<:class_artist:934859881519923250>' WHERE class_name = '도화가';
`

module.exports = {
    init: INIT,
    update: UPDATE,
};
