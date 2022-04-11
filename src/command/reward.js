const pgClient = require("../dao");
const rewardDao = require("../dao/reward");
const rewardOrderDao = require("../dao/rewardorder");

const getReward = async ([keyword, ...param] = []) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!품앗이 등록 [파티번호] [보상명]\n`;
    emptyMsg += `!품앗이 조회 [파티번호] [보상명]\n`;
    emptyMsg += `!품앗이 삭제 [파티번호] [보상명]\n\n`;

    emptyMsg += `!품앗이 참가 [파티번호] [보상명] [멤버명] [순서]\n`;
    emptyMsg += `!품앗이 수정 [파티번호] [보상명] [멤버명] [순서]\n`;
    emptyMsg += `!품앗이 탈퇴 [파티번호] [보상명] [멤버명]\n`;
    emptyMsg += `!품앗이 획득 [파티번호] [보상명] [멤버명]\n`;
    

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "등록") {
        return pgClient
            .query(rewardDao.create, param)
            .then(() => "품앗이 등록에 성공했습니다.")
            .catch(() => "품앗이 등록에 실패했습니다.");
    }

    if (keyword === "조회") {
        return pgClient
            .query(rewardOrderDao.listByReward, param)
            .then((res) => {
                console.log(JSON.stringify(res, null, 2));
                const orders = res.sort((a, b) => a.loot_order - b.loot_order)
                    .map(order => order.user_name)
                
                const nextOrder = res.sort((a, b) => {  
                    if(a.loot_count === b.loot_count) return a.loot_order - b.loot_order;
                    
                    return a.loot_count - b.loot_count;
                })[0].user_name;

                return `${orders.join(" - ")}\n다음 획득 차례는 ${nextOrder}님 입니다.`
            })
            .catch(() => "실패");
    }

    if (keyword === "삭제") {
        return pgClient
            .query(rewardOrderDao.deleteByReward, param)
            .query(rewardDao.delete, param)
            .then(() => "품앗이 삭제에 성공했습니다.")
            .catch(() => "품앗이 삭제에 실패했습니다.");
    }

    if (keyword === "참가") {
        return pgClient
            .query(rewardOrderDao.create, param)
            .then(() => "품앗이 참가에 성공했습니다.")
            .catch(() => "품앗이 참가에 실패했습니다.");
    }

    if (keyword === "수정") {
        return pgClient
            .query(rewardOrderDao.updateOrder, param)
            .then(() => "품앗이 수정에 성공했습니다.")
            .catch(() => "품앗이 수정에 실패했습니다.");
    }

    if (keyword === "탈퇴") {
        return pgClient
            .query(rewardOrderDao.delete, param)
            .then(() => "품앗이 탈퇴에 성공했습니다.")
            .catch(() => "품앗이 탈퇴에 실패했습니다.");
    }

    if (keyword === "획득") {
        return pgClient
            .query(rewardOrderDao.increaseLootCount, param)
            .then(() => "품앗이 획득에 성공했습니다.")
            .catch(() => "품앗이 획득에 실패했습니다.");
    }
    return emptyMsg;
};

module.exports = {
    getReward,
};
