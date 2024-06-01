const pgClient = require("../dao");
const leagueDao = require("../dao/league");

const create = async (param) => {
    return pgClient
        .query(leagueDao.create, param)
        .then((res) => "성공")
        .catch(() => "실패");
}

const leagueCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!리그 생성 {리그명} {리그일자} {참가마감} {참가인원}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "생성") {
        return create(param)
            .then(() => "리그 생성에 성공했습니다.")
            .catch(() => "리그 생성에 실패했습니다.");
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    leagueCommand,
};
