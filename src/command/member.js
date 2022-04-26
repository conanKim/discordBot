const pgClient = require("../dao");
const userDao = require("../dao/user");

const getMember = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!멤버 등록 [닉네임] [접두사]\n`;
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
