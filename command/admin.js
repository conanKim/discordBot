const pgClient = require("../dao");
const adminDao = require("../dao/admin");

const adminCommand = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!관리자 초기화\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "초기화") {
        return pgClient
            .query(adminDao.reset, param)
            .then(() => pgClient.schema())
            .then(() => "DB가 초기화 되었습니다.")
            .catch(() => "파티 생성에 실패했습니다.");
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    adminCommand,
};
