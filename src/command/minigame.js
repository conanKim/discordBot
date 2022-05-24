const pgClient = require("../dao");
const minigameDao = require("../dao/minigame");

const refineData = [
    [1, 0, 1, 0, 0], //0
    [1, 0, 1, 0, 0], //1
    [1, 0, 1, 0, 0], //2
    [1, 0, 1, 0, 0], //3
    [1, 0, 1, 0, 0], //4
    [1, 0, 1, 0, 0], //5
    [0.8, 0.06, 1, 0.3721, 0], //6
    [0.65, 0.045, 1, 0.3023, 0], //7
    [0.5, 0.03, 1, 0.2326, 0], //8
    [0.5, 0.03, 1, 0.2326, 0], //9
    [0.5, 0.03, 1, 0.2326, 0], //10
    [0.35, 0.015, 1, 0.1628, 0], //11
    [0.35, 0.015, 1, 0.1628, 0], //12
    [0.35, 0.015, 1, 0.1628, 0], //13
    [0.3, 0.01, 1, 0.1395, 0], //14
    [0.1, 0.01, 0.2, 0.0465, 0], //15
    [0.1, 0.01, 0.2, 0.465, 0], //16
    [0.05, 0.005, 0.1, 0.0233, 0], //17
    [0.05, 0.005, 0.1, 0.0233, 0], //18
    [0.03, 0.003, 0.06, 0.014, 0], //19
    [0.1, 0.01, 0.2, 0.0465, 0], //+12
    [0.05, 0.005, 0.1, 0.0233, 0], //+13
    [0.05, 0.005, 0.1, 0.0233, 0], //+14
    [0.04, 0.004, 0.08, 0.0186, 0], //+15
    [0.04, 0.004, 0.08, 0.0186, 0], //+16
    [0.03, 0.003, 0.06, 0.014, 0], //+17
    [0.03, 0.003, 0.06, 0.014, 0], //+18
    [0.015, 0.0015, 0.03, 0.007, 0], //+19
    [0.015, 0.0015, 0.03, 0.007, 0.005], //+20
    [0.01, 0.001, 0.02, 0.0047, 0.01], //+21
    [0.01, 0.001, 0.02, 0.0047, 0.015], //+22
    [0.005, 0.0005, 0.01, 0.0023, 0.02], //+23
    [0.005, 0.0005, 0.01, 0.0023, 0.025], //+24
]

const minigame = async ([keyword, ...param] = [], discordId, noticeCallback) => {
    if(keyword === "!재련") {
        if(param[0] === "도움말") {
            let emptyMsg = "";
            emptyMsg += `사용법\n`;
            emptyMsg += `!재련\n`;
            emptyMsg += `!재련 조회\n`;
            emptyMsg += `!재련 랭킹\n`;
        
            return emptyMsg;
        }

        if(param[0] === "참가") {
            return pgClient
                .query(minigameDao.join, [discordId])
                .then((res) => `재련 게임에 참가했습니다.`)
                .catch(() => `재련게임 참가에 실패했습니다.`)
        }

        if(param[0] === "조회") {
            return pgClient
                .query(minigameDao.select, [discordId])
                .then((res) => {
                    const refine = res[0];
                    const itemColor = refine.refine_level < 20 ? "유물" : "고대";
                    const refineLevel = refine.refine_level < 20 ? refine.refine_level : refine.refine_level - 8;

                    if(refine.refine_level === 33) {
                        return `현재 [${itemColor}] ${refineLevel}강 입니다.`
                    }
                    
                    return `현재 [${itemColor}] ${refineLevel}강, 장인의 기운 ${Math.round(Math.min(refine.try_count * refineData[refine.refine_level][3], 1) * 10000) / 100}% 입니다.`
                })
                .catch(() => "재련 수치 조회에 실패했습니다.")
        }

        if(param[0] === "랭킹") {
            //TODO
            return "아직 지원되지 않는 기능입니다."
        }

        if(param[0] === "초기화") {
            return pgClient
                .query(minigameDao.refineReset, [discordId, 0])
                .then((res) => `재련 게임을 초기화 했습니다.`)
                .catch(() => `재련게임 초기화에 실패했습니다.`)
        }

        const res = await pgClient.query(minigameDao.select, [discordId])

        const refine = res[0];
        const elapsedTime = new Date().getTime() - refine.last_execute_time;
        if(elapsedTime < 1000 * 60) {
            return `마지막 재련 시도 이후 1분이 지나지 않았습니다. 남은시간 : ${60 - Math.round(elapsedTime/1000)} 초`
        }

        const [baseRate, bonusRate, maxRate, energy, destroyRate] = refineData[refine.refine_level];

        const itemColor = refine.refine_level < 20 ? "유물" : "고대";
        const refineLevel = refine.refine_level < 20 ? refine.refine_level : refine.refine_level - 8;

        if(refine.refine_level === 33) {
            return `현재 [${itemColor}] ${refineLevel}강 입니다.`
        }
        
        if(energy * refine.try_count > 1) {
            return pgClient
                .query(minigameDao.refineSuccess, [discordId, new Date().getTime()])
                .then(() => {
                    let message = `장기백으로 [${itemColor}] ${refineLevel + 1}강 강화에 성공했습니다.\n`
                    if(refine.refine_level + 1 === 20) {
                        message += `[유물] 20강 장비를 [고대] 12강으로 계승하였습니다.\n` 
                    }
                    
                    if(refine.refine_level + 1 > 28) {
                        noticeCallback(`[${itemColor}] ${refineLevel + 1}강 강화에 성공했습니다.`);
                    }
                    return message;
                })
                .catch(() => {})
        }

        const refineRate = Math.min(baseRate + bonusRate * refine.try_count, maxRate);
        const dice = Math.random();
        if(dice < refineRate) {
            const currentEnergy = energy * refine.try_count;

            return pgClient
                .query(minigameDao.refineSuccess, [discordId, new Date().getTime()])
                .then(() => {
                    let message = `${Math.round(refineRate * 10000) / 100}% 의 확률을 뚫고 장인의 기운 ${Math.round(currentEnergy * 10000) / 100}% 에서 [${itemColor}] ${refineLevel + 1}강 강화에 성공했습니다.\n`
                    if(refine.refine_level + 1 === 20) {
                        message += `[유물] 20강 장비를 [고대] 12강으로 계승하였습니다.\n` 
                    }

                    if(refine.refine_level + 1 > 28) {
                        noticeCallback(`[${itemColor}] ${refineLevel + 1}강 강화에 성공했습니다.`);
                    }

                    return message;
                })
                .catch(() => {})
        } else if(dice > 1 - destroyRate) {
            return pgClient
                .query(minigameDao.refineReset, [discordId, new Date().getTime()])
                .then((res) => {
                    
                    noticeCallback(`[${itemColor}] ${refineLevel}강에서 장비가 파괴되었습니다.`);
                    return `[${itemColor}] ${refineLevel}강에서 ${destroyRate * 100}% 확률을 뚫고 장비가 파괴되었습니다.`
                })
                .catch(() => `[${itemColor}] ${refineLevel}강에서 ${destroyRate * 100}% 확률을 뚫고 장비가 파괴될뻔 했지만 서버오류로 한번만 봐드립니다.`)
        } else {
            const nextEnergy = Math.min(energy * (refine.try_count + 1), 1);

            return pgClient
                .query(minigameDao.refineFailed, [discordId, new Date().getTime()])
                .then(() => `${Math.round(refineRate * 10000) / 100}% 의 확률을 뚫지 못하고 [${itemColor}] ${refineLevel + 1}강 강화에 실패했습니다.\n(현재 장인의 기운 ${Math.round(nextEnergy * 10000) / 100}%)`)
                .catch(() => {})
        }
    }
}

module.exports = {
    minigame: minigame
}