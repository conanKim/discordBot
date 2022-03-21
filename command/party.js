const pgClient = require("../dao");
const partyDao = require("../dao/party");

const getParty = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!파티 생성 [레이드] [난이도]\n`;
    emptyMsg += `!파티 조회\n`;
    emptyMsg += `!파티 [레이드]\n`;
    emptyMsg += `!파티 삭제 [닉네임]\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "생성") {
        return pgClient
            .query(partyDao.create, param)
            .then(() => "파티 생성에 성공했습니다.")
            .catch(() => "파티 생성에 실패했습니다.");
    }

    if (keyword === "조회") {
        const query = !param[0] ? partyDao.list : partyDao.listByRaid;
        return pgClient
            .query(query, param)
            .then((res) => JSON.stringify(res))
            .catch(() => "실패");
    }

    if (keyword === "삭제") {
        return pgClient
            .query(partyDao.delete, param)
            .then(() => "파티 삭제에 성공했습니다.")
            .catch(() => "파티 삭제에 실패했습니다.");
    }

    return emptyMsg;
};

module.exports = {
    getParty,
};
