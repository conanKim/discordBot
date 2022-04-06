const pgClient = require("../dao");
const userDao = require("../dao/user");
const charDao = require("../dao/character");
const classDao = require("../dao/class");
const axios = require("axios");
const cheerio = require("cheerio");
const { getCharDetail } = require("./level");

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
    emptyMsg += `!멤버 등록 [닉네임] [접두사]\n`;
    emptyMsg += `!멤버 갱신 [닉네임]\n`;
    emptyMsg += `!멤버 조회\n`;
    emptyMsg += `!멤버 조회 [닉네임]\n`;
    emptyMsg += `!멤버 삭제 [닉네임]\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "등록") {
        return pgClient
            .query(userDao.create, param)
            .then(() => "멤버 등록에 성공했습니다.")
            .catch(() => "멤버 등록에 실패했습니다.");
    }

    if (keyword === "갱신") {
        if (!param[0]) return "갱신할 멤버 이름을 입력해주세요.";

        const logs = [];

        try {
            const regCharList = await pgClient.query(charDao.list, param);
            if (!regCharList.length) return "먼저 캐릭터를 하나 이상 등록해주세요.";
    
            const classData = await pgClient.query(classDao.list);
            const classObj = classData.reduce((prev, curr) => (
                {
                    ...prev, 
                    [curr.class_name]: curr.emoji
                }
            ), {})

            const charName = regCharList[0].char_name;
            const encodeNickName = encodeURI(charName);
            const html = await axios.get(`https://lostark.game.onstove.com/Profile/Character/${encodeNickName}`);
            const $ = cheerio.load(html.data);

            const armoryCharList = await getCharacterList($);
            const allList = regCharList.map(c => c.char_name).concat(armoryCharList);
            const charList = allList.filter((item, index) => allList.indexOf(item) === index);

            const charDetailList = await Promise.all(
                charList.map(async (charName) => {
                    return getCharDetail(charName);
                })
            );
            
            await Promise.all(
                charDetailList.map(async (cd) => {
                    const updatedChar = regCharList.find(char => char.char_name === cd.name);

                    if(cd.deleted) {
                        logs.push(`삭제 - ${classObj[updatedChar.class_name]}${updatedChar.class_name} ${updatedChar.char_name}`);
                        return await pgClient.query(charDao.delete, [updatedChar.char_name]);
                    }

                    if(!updatedChar) {
                        logs.push(`신규 - ${classObj[cd.job]}${cd.job} ${cd.name} ${cd.level}`)
                    } else if (updatedChar.char_level !== cd.level) {
                        logs.push(`변경 - ${classObj[cd.job]}${cd.job} ${cd.name} ${updatedChar.char_level} => ${cd.level}`)
                    }
                    return await pgClient.query(charDao.update, [param[0], cd.name, cd.job, cd.level]);
                })
            );
            return "캐릭터 갱신에 성공했습니다.\n\n" + logs.join("\n");
        } catch (e) {
            return "캐릭터 갱신에 실패했습니다.";
        }
    }

    if (keyword === "조회") {
        return pgClient
            .query(userDao.list)
            .then((res) => JSON.stringify(res))
            .catch(() => "실패");
    }
    if (keyword === "삭제") {
        return pgClient
            .query(userDao.delete, param)
            .then(() => "멤버 삭제에 성공했습니다.")
            .catch(() => "멤버 삭제에 실패했습니다.");
    }

    return emptyMsg;
};

module.exports = {
    getMember,
};
