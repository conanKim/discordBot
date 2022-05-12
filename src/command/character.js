const pgClient = require("../dao");
const charDao = require("../dao/character");

const getCharacter = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!캐릭터 등록 [멤버] [캐릭명] [직업] [레벨]\n`;
    emptyMsg += `!캐릭터 목록 [?직업]\n`;
    emptyMsg += `!캐릭터 삭제 [캐릭명]\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "등록") {
        return pgClient
            .query(charDao.create, param)
            .then(() => "캐릭터 등록에 성공했습니다.")
            .catch(() => "캐릭터 등록에 실패했습니다.");
    }

    if (keyword === "레벨") {
        return pgClient
            .query(charDao.update, param)
            .then((res) => "캐릭터 레벨을 수정했습니다.")
            .catch(() => "실패");
    }

    if (keyword === "목록") {
        console.log(param)
        return pgClient
            .query(charDao.rank)
            .then((res) => {
                console.log(res);
                return res
                    .filter((char) => char.char_level > 1300)
                    .filter((char) => param[0] ? char.class_nickname === param[0] || char.class_name === param[0] : true)
                    .slice(0, 10)
                    .map(
                        (char, index) =>
                            `${char.emoji}${char.prefix}${char.class_nickname} - ${char.char_level} ${char.char_name}`
                    )
                    .join("\n");
            })
            .catch(() => "실패");
    }

    if (keyword === "삭제") {
        return pgClient
            .query(charDao.delete, param)
            .then(() => "캐릭터 삭제에 성공했습니다.")
            .catch(() => "캐릭터 삭제에 실패했습니다.");
    }

    return emptyMsg;
};

module.exports = {
    getCharacter,
};
