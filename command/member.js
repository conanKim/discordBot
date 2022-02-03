const axios = require("axios");
const cheerio = require("cheerio");

let members = [];

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

const getMember = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!멤버 등록 [닉네임] [본캐명]\n`;
    emptyMsg += `!멤버 조회\n`;
    emptyMsg += `!멤버 조회 [닉네임]\n`;
    emptyMsg += `!멤버 삭제 [닉네임]\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "등록") {
        if (members.find((m) => m.nickName === param[0])) {
            return "이미 존재하는 닉네임 입니다.";
        }
        if (members.find((m) => m.chrName === param[1])) {
            return "이미 존재하는 캐릭터명 입니다.";
        }
        members.push({ nickName: param[0], chrName: param[1] });
        return "멤버 등록이 완료되었습니다.";
    }
    if (keyword === "조회") {
        if (!param[0]) return JSON.stringify(members);
        if (!members.find((m) => m.nickName === param[0])) {
            return "해당하는 사용자가 없습니다.";
        }

        const chrName = members.find((m) => m.nickName === param[0]).chrName;
        const encodeNickName = encodeURI(chrName);
        const html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
        const $ = cheerio.load(html.data);

        const charList = getCharacterList($);

        return JSON.stringify(charList);
    }
    if (keyword === "삭제") {
        if (!members.find((m) => m.nickName === param[0])) {
            return "해당하는 사용자가 없습니다.";
        }

        members = members.filter((m) => m.nickName !== param[0]);
        return "멤버 삭제가 완료되었습니다.";
    }

    return emptyMsg;
};

module.exports = {
    getMember,
};
