const { MessageEmbed } = require("discord.js");
const pgClient = require("../dao");
const partyDao = require("../dao/party");
const partyMemberDao = require("../dao/partymember");

const generatePartyEmbed = (title, party) => {
    return `${title}\n\n` + party.map((p) => `${p.raid} ${p.diff} ${p.id}파티\n${p.members.join(" ")}`).join('\n\n')
}

const getParty = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!파티 생성 [레이드] [난이도]\n`;
    emptyMsg += `!파티 목록 [레이드]\n`;
    
    emptyMsg += `!파티 참가 [번호] [캐릭명]\n`;
    emptyMsg += `!파티 탈퇴 [번호] [캐릭명]\n`;
    emptyMsg += `!파티 수정 [번호] [난이도]\n`;
    emptyMsg += `!파티 삭제 [번호]\n\n`;

    let query;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "생성") {
        return pgClient
            .query(partyDao.create, param)
            .then((res) => `${param[0]} ${param[1]} ${res[0].party_id}파티 생성에 성공했습니다.`)
            .catch(() => "파티 생성에 실패했습니다.");
    }

    if (keyword === "삭제") {
        return pgClient
            .query(partyDao.delete, param)
            .then(() => "파티 삭제에 성공했습니다.")
            .catch(() => "파티 삭제에 실패했습니다.");
    }

    if (keyword === "수정") {
        return pgClient
            .query(partyDao.update, param)
            .then(() => "파티 수정에 성공했습니다.")
            .catch(() => "파티 수정에 실패했습니다.");
    }

    if (keyword === "참가") {
        return pgClient
            .query(partyMemberDao.create, param)
            .then(() => "파티 참가에 성공했습니다.")
            .catch(() => "파티 참가에 실패했습니다.");
    }

    if (keyword === "목록") {
        if(!param[0]) return "레이드 명을 입력해주세요."
        return pgClient
            .query(partyDao.listByRaid, param)
            .then((res) => {
                const result = res.reduce((prev, curr) => {
                    const prevParty = prev.find((p) => p.id === curr.party_id);
                    if (prevParty) {
                        prevParty.members.push(`${curr.emoji}${curr.prefix}${curr.class_nickname}`);
                        return prev;
                    }

                    prev.push({
                        id: curr.party_id,
                        raid: curr.raid_nickname,
                        diff: curr.difficulty,
                        members: [`${curr.emoji}${curr.prefix}${curr.class_nickname}`],
                    });

                    return prev;
                }, []);

                return generatePartyEmbed(`파티 목록 - ${param[0]}`, result)
            })
            .catch(() => "실패");
    }

    if (keyword === "찾기") {
        const [members, ...raid] = param;
        query = raid.length === 0 ? partyDao.listAll : partyDao.listByRaid;
        return pgClient
            .query(query, raid)
            .then((res) => {
                const result = res.reduce((prev, curr) => {
                    const prevParty = prev.find((p) => p.id === curr.party_id);
                    if (prevParty) {
                        prevParty.members.push(`${curr.emoji}${curr.prefix}${curr.class_nickname}`);
                        prevParty.prefixs = prevParty.prefixs + curr.prefix;
                        return prev;
                    }

                    prev.push({
                        id: curr.party_id,
                        raid: curr.raid_nickname,
                        diff: curr.difficulty,
                        members: [`${curr.emoji}${curr.prefix}${curr.class_nickname}`],
                        prefixs: [curr.prefix]
                    });

                    return prev;
                }, []).filter((res) => members.split("").every(m => res.prefixs.includes(m)));

                return generatePartyEmbed(`파티 찾기 - ${param[0]}`, result)
            })
            .catch(() => "");
    }

    if (keyword === "탈퇴") {
        return pgClient
            .query(partyMemberDao.delete, param)
            .then(() => "파티 탈퇴에 성공했습니다.")
            .catch(() => "파티 탈퇴에 실패했습니다.");
    }

    return emptyMsg;
};

module.exports = {
    getParty,
};
