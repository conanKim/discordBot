const pgClient = require("../dao");
const entryDao = require("../dao/entry");

const { putLvupGG } = require("../utils/utils");

const create = async ([leagueName, bracketId, token]) => {
    return pgClient
        .query(entryDao.select, [leagueName])
        .then((res) => {
            const rosters = res.map((entry, idx) => ({id: 'Hjk7eZbCaIzuHcj23456'+idx, name: entry.user_name}));
            const body = {
               "easyBracketId": "665aa0d65b276900074cb1dd",
               "organizeUserId": "665aa0bbbde5e230c677139d",
               "title": "UGP 예선",
               "status": "PRE",
               "participantSize": 1,
               "participantPerGroupSize": null,
               "bracketType": "SINGLE_ELIMINATION",
               "useOverlay": false,
               "overlaySetting": {
                 "version": "4",
                 "rosters": rosters,
                 "matchResults": [],
                 "bracketType": "round-robin",
                 "sortWeights": [],
                 "useSemiFinal": false,
                 "phase": "PRE",
                 "roundsPlayed": 1,
                 "timer": 0,
                 "perGroup": 3,
                 "roundRobinOrder": []
               },
               "useChannel": false,
               "channelLinks": {},
               "createdDatetime": 1717215446612,
               "modifiedDatetime": 1717215446612,
               "matchResults": [],
               "pusher": {
                 "type": "UPDATE",
                 "id": "TVGX97An1epO4Jokt_9wP"
               }
            }
            return putLvupGG(bracketId, body, token.replace(/(\r\n|\n|\r)/gm, "")).then(() => "대진표 생성 성공")
        })
        .catch(() => "실패");
}

const matchCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!대진표 생성 {리그명} {lvup.gg URL} {lvup.gg 토큰}\n`;

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
