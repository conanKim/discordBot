const pgClient = require("../dao");
const charDao = require("../dao/character");

const classDao = require("../dao/class");
const { getCharDetail, getCharacterList } = require("../utils/utils");

const getRoster = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!원정대 갱신 [멤버]\n`;
    emptyMsg += `!원정대 조회\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "조회") {
        return pgClient
            .query(charDao.list, param)
            .then((res) =>
                res
		    .filter((char) => char.char_level > 1300)
                    .sort((a, b) => b.char_level - a.char_level)
                    .map((char) => `${char.emoji}${char.char_name} - ${char.char_level} ${char.class_name}`)
                    .join("\n")
            )
            .catch(() => "실패");
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

            const charName = regCharList
                .reduce((curr, prev) => {
                    return curr.char_level > prev.char_level ? curr : prev
                }, { char_level: -Infinity })
                .char_name;

            console.log(`최고 레벨 캐릭터 : ${charName}`);

            const armoryCharList = await getCharacterList(charName);
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
            return `${param[0]}의 원정대 갱신에 성공했습니다.\n\n` + logs.join("\n");
        } catch (e) {
            return "원정대 갱신에 실패했습니다.";
        }
    }

    return emptyMsg;
};

module.exports = {
    getRoster,
};
