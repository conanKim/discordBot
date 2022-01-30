const axios = require("axios");
const cheerio = require("cheerio");

const raidCharacterList = {
    발탄: {
        노말: [],
        하드: [],
        헬: [],
    },
    비아키스: {
        노말: [],
        하드: [],
        헬: [],
    },
    쿠크세이튼: {
        노말: [],
    },
    아브렐슈드: {
        노말: [],
        하드: [],
    },
};

const joinRaid = async (param) => {
    console.log(param);
    let msg = "";

    if (!param[0]) {
        msg += "참가할 레이드와 직업, 캐릭터 이름을 입력해주세요 (!레이드 신청 발탄 하드 네지트)\n";
        msg += "참가를 취소하고 싶으면 취소할 레이드와 캐릭터 이름을 입력해주세요 (!레이드 취소 발탄 하드 네지트)";
        return msg;
    }

    if (param[0] === "취소") {
        try {
            const removedList = raidCharacterList[param[1]][param[2]].filter((user) => user.name !== param[3]);
            raidCharacterList[param[1]][param[2]] = removedList;
            msg = `${param[1]} ${param[2]} 레이드에서 ${param[3]} 캐릭터가 삭제되었습니다.`;
            return msg;
        } catch (e) {
            return `레이드를 잘못 입력했습니다.`;
        }
    }

    if (param[0] === "조회") {
        return JSON.stringify(raidCharacterList);
    }

    if (param[0] === "신청") {
        const nickName = param[3];
        const encodeNickName = encodeURI(nickName);
        const html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
        const $ = cheerio.load(html.data);
        const userName = $("span.profile-character-info__name").text();
        const job = $("img.profile-character-info__img").attr("alt");
        const levelStr = $("div.level-info2>div.level-info2__item span:nth-of-type(2)").text();
        const levelNumStr = levelStr.replace("Lv.", "").replace(",", "");
        const level = parseFloat(levelNumStr);

        if (!userName) {
            return "존재하지 않는 캐릭터입니다.";
        }

        const targetList = raidCharacterList[param[1]][param[2]] || [];
        const newList = [...targetList, { class: job, name: userName, level: level }];
        raidCharacterList[param[1]][param[2]] = newList;

        return `[${levelStr} ${job}] ${nickName} 캐릭터가 등록 되었습니다.`;
    }

    return "명령어를 잘못 입력하셨습니다.";
};

module.exports = {
    joinRaid,
};
