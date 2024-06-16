const { ChannelType } = require("discord.js");

const pgClient = require("../dao");
const leagueDao = require("../dao/league");
const entryDao = require("../dao/entry");
const matchDao = require("../dao/match");
const groupDao = require("../dao/group");
const { putLvupGG } = require("../utils/utils");

const { adminId } = require("../../../config.json");

const create = async ([leagueName, bracketId, token], guildMgr) => {
    const leagueData = (await pgClient.query(leagueDao.selectByName, [leagueName]))[0]
    return pgClient
        .query(entryDao.select, [leagueName])
        .then((res) => {
            const entries = res
                .map(row => ({...row, seed: Math.random()}))
                .sort((a, b) => a.seed - b.seed)

            const dummyCount = leagueData.user_count_limit - entries.length;

            for(let i = 0; i < dummyCount; i++) {
                const id = i + 1 < 10 ? '0' + (i + 1) : i + 1
                entries.push({...entries[0], uma_uid: 'dummy00000' + id, user_name: '더미' + id, discord_id: 'DUMMY' })
            }

            console.log(entries)
            return { leagueData, entries, guildMgr }
        })
        .then(async (res) => {
            const body = {
               "easyBracketId": "665aa0d65b276900074cb1dd",
               "organizeUserId": "665aa0bbbde5e230c677139d",
               "title": `${leagueName}`,
               "status": "PRE",
               "participantSize": 1,
               "participantPerGroupSize": null,
               "bracketType": "SINGLE_ELIMINATION",
               "useOverlay": false,
               "overlaySetting": {
                 "version": "4",
                 "rosters": res.entries.map((entry, idx) => ({id: 'UmaLeague' + entry.uma_uid, name: entry.user_name})),
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

            console.log("API 요청 시작")
            return putLvupGG(bracketId, body, token.replace(/(\r\n|\n|\r)/gm, ""))
                .then(() => res)
                .catch((e) => {
                    console.log(e)
                    throw e
                })
        }).then(async (res) => {
            const leagueId = res.leagueData.league_id;

            console.log("CHANNEL RESET 시작")
            const groups = await pgClient.query(groupDao.selectByLeague, [leagueId])
            for (let i = 0; i < groups.length; i++) {
                await res.guildMgr.channels.delete(groups[i].chat_channel_id, 'making room for new channels')
                  .then(console.log)
                  .catch(console.error);
            }

            console.log("TABLE RESET 시작")
            await pgClient.query(matchDao.reset, [leagueName])
            console.log("MATCH RESET 완료")
            await pgClient.query(groupDao.reset, [leagueName])
            console.log("GROUP RESET 완료")


            await res.guildMgr.channels.create({ name: leagueName, type: ChannelType.GuildCategory }).then(async CategoryChannel => {
                for (let i = 0; i < res.entries.length / 3; i++) {
                    const everyoneRole = guild.roles.everyone;

                    await res.guildMgr.channels.create({ 
                        name: `그룹 - ${i + 1}`, 
                        type: ChannelType.GuildText,
                        parent: CategoryChannel, 
                        permissionsOverwrites: [
                            ...adminId.map(admin => (id: admin, allow: [PermissionsBitField.Flags.ViewChannel]})),
                            {id: client.user.id, allow: [PermissionsBitField.Flags.ViewChannel]},
                            {id: everyoneRole.id, deny: [PermissionsBitField.Flags.ViewChannel]},
                        ],
                    }).then(async TextChannel => {
                        await pgClient.query(groupDao.create, [leagueId, `그룹 - ${i + 1}`, TextChannel.id])
                    });
                }
            }).catch();
            console.log("GROUP CREATE 완료")

            const groupCount = res.entries.length / 3

            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < groupCount; j++) {
                    const groupData = await pgClient.query(groupDao.selectByName, [leagueId, `그룹 - ${j + 1}`]);
                    const groupId = groupData[0].group_id;

                    const row = res.entries[i * groupCount + j]
        			console.log(row)
                    await pgClient.query(matchDao.create, [leagueId, groupId, row.uma_uid])
                }
            }

            for (let i = 0; i < groupCount; i++) {
                const matchData = await pgClient.query(matchDao.selectByGroup, [leagueId, `그룹 - ${j + 1}`]);
                console.log(matchData)
                res.guildMgr.channels.permissionOverwrites.set(
                    matchData.filter(data => data.discord_id !== "DUMMY").map(data => ({
                        id: data.discord_id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    }))
                )
            }
            console.log("MATCH CREATE 완료")

            return "대진표 생성 성공"
        })
	        .catch((e) => {console.log(e); return "실패"});

}

const getMatches = async (param) => {
    return pgClient
        .query(matchDao.selectByLeague, param)
        .then((res) => {
            const matches = res.reduce((prev, curr) => {
                console.log(curr, prev)
                prev[curr.group_name] = prev[curr.group_name] ? [...prev[curr.group_name], curr.user_name] : [curr.user_name];
                return prev;
            }, {})
            return Object.keys(matches).map(key => `${key} - ${matches[key].join(", ")}`).join("\n")
        })
        .catch(() => "실패");
}

const matchCommand = async ([keyword, ...param] = [], discordId, guildMgr) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!대진표 생성 {리그명} {lvup.gg URL} {lvup.gg 토큰}\n`;
    emptyMsg += `!대진표 조회 {리그명}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "생성") {
        return create(param, guildMgr)
    }

    if (keyword === "조회") {
        return getMatches(param)
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    matchCommand,
};
