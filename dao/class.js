const INIT = `CREATE TABLE IF NOT EXISTS classes (
    class_name varchar(50) NOT NULL,
    class_nickname varchar(4) NOT NULL,
    root_class varchar(50) NOT NULL,
    type varchar(50) NOT NULL,

    PRIMARY KEY (class_name)
);

INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('버서커', '서커', '전사', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('디스트로이어', '디붕', '전사', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('워로드', '워붕', '전사', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('배틀마스터', '배마', '무도가', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('인파이터', '인파', '무도가', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('기공사', '기공', '무도가', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('창술사', '창술', '무도가', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('스트라이커', '스커', '무도가', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('데빌헌터', '데헌', '헌터', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('블래스터', '블래', '헌터', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('호크아이', '호크', '헌터', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('스카우터', '스카', '헌터', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('건슬링어', '건슬', '헌터', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('아르카나', '알카', '마법사', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('서머너', '머너', '마법사', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('소서리스', '소서', '마법사', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('데모닉', '모닉', '암살자', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('블레이드', '블레', '암살자', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('리퍼', '리퍼', '암살자', '딜러');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('바드', '바드', '마법사', '서포터');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('홀리나이트', '홀나', '전사', '서포터');
INSERT INTO classes (class_name, class_nickname, root_class, type) VALUES ('도화가', '아가', '스페셜리스트', '서포터');
`;

module.exports = {
    init: INIT,
};
