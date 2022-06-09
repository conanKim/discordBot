const pgClient = require("../dao");
const userDao = require("../dao/user");
const partymemberDao = require("../dao/partymember");
const rewardorderDao = require("../dao/rewardorder");
const characterDao = require("../dao/character")

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
            .then((res) => res.map((user) => `[${user.prefix}] ${user.user_name}${user.discord_id ? " :white_check_mark:" : ""}`).join("\n"))
            .catch(() => "실패");
    }
    if (keyword === "삭제") {
        return pgClient
            .query(userDao.delete, param)
            .then(() => "멤버 삭제에 성공했습니다.")
            .catch(() => "멤버 삭제에 실패했습니다.");
    }
    if (keyword === "탈퇴") {
        return pgClient
            .query(partymemberDao.secession, param)
            .then(() => pgClient.query(rewardorderDao.secession, param))
            .then(() => pgClient.query(characterDao.secession, param))
            .then(() => pgClient.query(userDao.delete, param))
            .then(() => "멤버 탈퇴에 성공했습니다.")
            .catch(() => "멤버 탈퇴에 실패했습니다.");
    }
    if (keyword === "인증") {
        return pgClient
            .query(userDao.authenticate, param)
            .then(() => "멤버 인증에 성공했습니다.")
            .catch(() => "멤버 인증에 실패했습니다.");
    }

    if (keyword === "대리인증") {
        return pgClient
            .query(userDao.authenticate, [param[0], param[1]])
            .then(() => "멤버 인증에 성공했습니다.")
            .catch(() => "멤버 인증에 실패했습니다.");
    }

    return emptyMsg;
};

module.exports = {
    getMember,
};
