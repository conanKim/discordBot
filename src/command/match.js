const pgClient = require("../dao");
const entryDao = require("../dao/entry");

const create = async (param) => {
    return pgClient
        .query(entryDao.select, param)
        .then((res) => {
            const body = {
                rosters: res.map(entry => ({id: entry.uma_uid, name: entry.user_name}))
            }
            return JSON.stringify(body)
        })
        .catch(() => "실패");
}

const matchCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!대진표 생성 {리그명}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "생성") {
        return create(param)
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    matchCommand,
};
