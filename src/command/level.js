const axios = require("axios");
const cheerio = require("cheerio");

const getCharDetail = async (name) => {
    const encodeNickName = encodeURI(name);
    const html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
    const $ = cheerio.load(html.data);
    const levelText = $("div.level-info2>div.level-info2__item span:nth-of-type(2)").text();
    if (!levelText) {
        return { name, deleted: true }
    }
    const level = parseInt(levelText.split(".")[1].replace(",", ""));

    const job = $("img.profile-character-info__img").attr("alt");
    console.log(`캐릭터조회 : ${name}`);

    return { name, level, job };
};
const getUserLevel = async (nickName) => {
    if (!nickName) {
        return "캐릭터명이 입력되지 않았습니다. [!레벨 캐릭터명] 으로 입력해주세요.";
    }

    const { userName, level, job } = getCharDetail(nickName);

    if (!userName) {
        return "존재하지 않는 캐릭터입니다.";
    }

    let msg = `${userName}의 달성 아이템 레벨은 ${level}이고 직업은 ${job}입니다.\n`;
    msg += `Loawa 에서 보기 : https://loawa.com/char/${userName}`;

    return msg;
};

module.exports = {
    getUserLevel,
    getCharDetail,
};
