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

module.exports = {
    getCharacterList,
    getCharDetail,
};
