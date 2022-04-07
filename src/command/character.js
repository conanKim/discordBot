const pgClient = require("../dao");
const charDao = require("../dao/character");

const getCharacter = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!캐릭터 등록 [멤버] [캐릭명] [직업] [레벨]\n`;
    emptyMsg += `!캐릭터 조회\n`;
    emptyMsg += `!캐릭터 조회 [멤버]\n`;
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

    if (keyword === "조회") {
        return pgClient
            .query(charDao.list, param)
            .then((res) =>
                res
                    .sort((a, b) => b.char_level - a.char_level)
                    .map((char) => `${char.emoji}${char.char_name} - ${char.char_level} ${char.class_name}`)
                    .join("\n")
            )
            .catch(() => "실패");
    }

    if (keyword === "레벨") {
        return pgClient
            .query(charDao.update, param)
            .then((res) => "캐릭터 레벨을 수정했습니다.")
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
