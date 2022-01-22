const axios = require("axios");
const cheerio = require("cheerio");

const getUserLevel = async (nickName) => {
    if (!nickName) {
        return "캐릭터명이 입력되지 않았습니다. [!레벨 캐릭터명] 으로 입력해주세요.";
    }

    const encodeNickName = encodeURI(nickName);
    const html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
    const $ = cheerio.load(html.data);
    const userName = $("span.profile-character-info__name").text();
    const level = $("div.level-info2>div.level-info2__item span:nth-of-type(2)").text();

    const job = $("img.profile-character-info__img").attr("alt");
    console.log(`캐릭터조회 : ${userName}`);

    if (!userName) {
        return "존재하지 않는 캐릭터입니다.";
    }

    return `${userName}의 달성 아이템 레벨은 ${level}이고 직업은 ${job}입니다.`;
};

module.exports = {
    getUserLevel,
};
