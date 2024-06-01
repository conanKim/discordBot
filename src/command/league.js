const pgClient = require("../dao");
const leagueDao = require("../dao/league");
const entryDao = require("../dao/entry");

const create = async (param) => {
    return pgClient
        .query(leagueDao.create, param)
        .then(() => "리그 생성에 성공했습니다.")
        .catch(() => "리그 생성에 실패했습니다.");
}

const select = async (param) => {
    return pgClient
        .query(leagueDao.select)
        .then((res) => res.map((league) => `${league.league_id} ${league.league_name} ${league.league_date} ${league.join_date_limit} ${league.user_count_limit}`).join("\n"))
        .catch(() => "실패");
}

const join = async (param) => {
    return pgClient
        .query(entryDao.create, param)
        .then(() => "리그 참가에 성공했습니다.")
        .catch(() => "리그 참가에 실패했습니다.");
}

const leagueCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!리그 생성 {리그명} {리그일자} {참가마감} {참가인원}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "조회") {
        return select()
    }
    if (keyword === "생성") {
        return create(param)
    }
    if (keyword === "참가") {
        return join(param)
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    leagueCommand,
};
