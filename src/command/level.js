
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
};
