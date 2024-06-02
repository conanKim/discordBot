const pgClient = require("../dao");
const entryDao = require("../dao/entry");
const matchDao = require("../dao/match");
const groupDao = require("../dao/group");
const { putLvupGG } = require("../utils/utils");
const create = async ([leagueName, groupName, bracketId, token]) => {
    return pgClient
        .query(entryDao.select, [leagueName])
        .then((res) => {
            const matches = res.map(row => ({...row, seed: Math.random()}))
            matches.sort((a, b) => a.random - b.random)
            console.log(matches)

            if (matches.length % 3 !== 0) matches.push({...matches[0], uma_uid: 'dummy0000001', user_name: '더미' })
            if (matches.length % 3 !== 0) matches.splice(matches.length - 3, 0, {...matches[0], uma_uid: 'dummy0000002', user_name: '더미' })

            return matches;
        })
        .then((res) => {
            const body = {
               "easyBracketId": "665aa0d65b276900074cb1dd",
               "organizeUserId": "665aa0bbbde5e230c677139d",
               "title": `${leagueName} - ${groupName}`,
               "status": "PRE",
               "participantSize": 1,
               "participantPerGroupSize": null,
               "bracketType": "SINGLE_ELIMINATION",
               "useOverlay": false,
               "overlaySetting": {
                 "version": "4",
                 "rosters": res.map((entry, idx) => ({id: 'Hjk7eZbCaIzuHcj23456'+idx, name: entry.user_name})),
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
            return putLvupGG(bracketId, body, token.replace(/(\r\n|\n|\r)/gm, "")).then(() => res)
        }).then((res) => {
            await pgClient.query(matchDao.reset, [leagueName])
            console.log("MATCH RESET 완료")
            await pgClient.query(groupDao.reset, [leagueName])
            console.log("GROUP RESET 완료")

            for (let i = 1; i <= res.length % 3; i++) {
                await pgClient.query(groupDao.create, [`${groupName} - ${i}`])
            }
            console.log("GROUP CREATE 완료")

            for (let i = 0; i <= res.length / 3; i++) {
                for (let j = 0; j <= 3; j++) {
                    const row = res[i*3 + j]
                    await pgClient.query(matchDao.create, [row.league_id, `${groupName} - ${i}`, row.uma_uid])
                }
            }
            console.log("MATCH CREATE 완료")

            return "대진표 생성 성공"
        })
        .catch(() => "실패");
}

const getMatches = async (param) => {
    return pgClient
        .query(matchDao.select, param)
        .then((res) => {
            const matches = res.reduce((curr, prev) => {
                prev[curr.group_name] ? prev[curr.group_name] = [...prev[curr.group_name], curr.user_name] : [curr.user_name];
            }, {})
            return Object.keys(matches).map(key => `${key} - ${matches[key].join(", ")}`)
        })
        .catch(() => "실패");
}

const matchCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!대진표 생성 {리그명} {lvup.gg URL} {lvup.gg 토큰}\n`;
    emptyMsg += `!대진표 조회 {리그명}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "생성") {
        return create(param)
    }

    if (keyword === "조회") {
        return getMatches(param)
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    matchCommand,
};
