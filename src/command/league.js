import pgClient from "../dao.js";
import leagueDao from "../dao/league.js";
import entryDao from "../dao/entry.js";
import userDao from "../dao/user.js";

const create = async (param) => {
    return pgClient
        .query(leagueDao.create, param)
        .then(() => "리그 생성에 성공했습니다.")
        .catch(() => "리그 생성에 실패했습니다.");
}

const getList = async (param) => {
    return pgClient
        .query(leagueDao.select)
        .then((res) => res.map((league) => `${league.league_id} ${league.league_name} ${league.league_date} ${league.join_date_limit} ${league.user_count_limit}`).join("\n"))
        .catch(() => "실패");
}

const join = async (param, discordId) => {
    const uid = (await pgClient.query(userDao.selectByDiscord, [discordId.toString()]))[0].uma_uid
    const leagueId = (await pgClient.query(leagueDao.selectByName, param))[0].league_id
    return pgClient
        .query(entryDao.create, [leagueId, uid])
        .then(() => "리그 참가에 성공했습니다.")
        .catch(() => "리그 참가에 실패했습니다.");
}

const getEntries = async (param) => {
    return pgClient
        .query(entryDao.select, param)
        .then((res) => res.map((entry) => `${entry.user_name} ${entry.uma_uid}`).join("\n"))
        .catch(() => "실패");
}

const createMatch = async (param) => {
    return pgClient
        .query(entryDao.select, param)
        .then((res) => {
            const body = {
                rosters: res.filter().map(entry => ({id: entry.uma_uid, name: entry.user_name}))
            }
            return JSON.stringify(body)
        })
        .catch(() => "실패");
}

const leagueCommand = async ([keyword, ...param] = [], discordId) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!리그 생성 {리그명} {리그일자} {참가마감} {참가인원}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "조회") {
        return getList()
    }
    if (keyword === "생성") {
        return create(param)
    }
    if (keyword === "참가") {
        return join(param, discordId)
    }
    if (keyword === "참가자") {
        return getEntries(param)
    }
    return "잘못된 명령어 입니다.";
};

module.exports = {
    leagueCommand,
};
