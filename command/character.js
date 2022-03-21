const pgClient = require("../dao");
const charDao = require("../dao/character");

const getCharacterList = ($) => {
    const serverName = $("span.profile-character-info__server").text();
    const serverEl = $("strong.profile-character-list__server")
        .toArray()
        .find((el) => {
            return el.children[0].data === serverName;
        }).next.next;

    const charServer = serverEl.children.filter((c) => c.name === "li");
    return $(charServer)
        .toArray()
        .map((el) => {
            return $(el).find("span")[1].children[0].data;
        });
};

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
            .then((res) => JSON.stringify(res))
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
