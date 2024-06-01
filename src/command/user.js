const pgClient = require("../dao");
const userDao = require("../dao/user");

const create = async (param) => {
    return pgClient
        .query(userDao.create, param)
        .then(() => "유저 생성에 성공했습니다.")
        .catch(() => "유저 생성에 실패했습니다.");
}

const select = async (param) => {
    return pgClient
        .query(userDao.select)
        .then((res) => res.map((user) => `${user.uma_uid} - ${user.user_name} ${user.discord_id}`).join("\n"))
        .catch(() => "실패");
}

const userCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!유저 생성 {유저명} {uid}\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "조회") {
        return select()
    }
    if (keyword === "생성") {
        return create([...param])
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    userCommand,
};
