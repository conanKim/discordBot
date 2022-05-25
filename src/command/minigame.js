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
    [0.1, 0.01, 0.2, 0.0465, 0], //16
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

const qualityData = [
    0.86,
    1.89,
    3.27,
    6.17,
    12.85,
    23.3,
    37.53,
    55.54,
    77.1,
    100
]

const getQuality = () => {
    let rnd = Math.random() * 100;
    const qualityBase = (10 - qualityData.findIndex((q) => rnd < q)) * 10;

    const range = qualityBase === 100 ? 11 : 10;
    const rnd2 = Math.floor(rnd * range) % range;

    return qualityBase - rnd2;
}

const minigame = async ([keyword, ...param] = [], discordId, noticeCallback) => {
    if(keyword === "!재련") {
        if(param[0] === "도움말") {
            let emptyMsg = "";
            emptyMsg += `사용법\n`;
            emptyMsg += `!재련\n`;
            emptyMsg += `!재련 참가\n`;
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
                    const [baseRate, bonusRate, maxRate, energy, destroyRate] = refineData[refine.refine_level];
                    const refineRate = Math.min(baseRate + bonusRate * refine.try_count, maxRate);

                    const itemColor = refine.refine_level < 20 ? "유물" : "고대";
                    const refineLevel = refine.refine_level < 20 ? refine.refine_level : refine.refine_level - 8;

                    if(refine.refine_level === 33) {
                        return `현재 [${itemColor}] ${refineLevel}강 입니다.`
                    }

                    let message = `현재 [${itemColor}] ${refineLevel}강, 장인의 기운 ${Math.round(Math.min(refine.try_count * refineData[refine.refine_level][3], 1) * 10000) / 100}% 입니다.\n`
                    
                    message += `재련 시도 시 성공할 확률 : ${Math.round(refineRate * 10000) / 100}%\n`
                    if(destroyRate) {
                        message += `재련 시도 시 파괴될 확률 : ${Math.round(destroyRate * 10000) / 100}%\n`
                    }
                    message += `재련 실패 시 추가 장인의 기운 수치 : ${Math.round(energy * 10000) / 100}%\n`
                    return message;
                })
                .catch(() => "재련 수치 조회에 실패했습니다.")
        }

        if(param[0] === "퇴장") {
            return pgClient
                .query(minigameDao.delete, [discordId])
                .then((res) => `재련 게임에 퇴장했습니다.`)
                .catch(() => `재련게임 퇴장에 실패했습니다.`)
        }

        if(param[0] === "랭킹") {
            return pgClient
                .query(minigameDao.selectAll)
                .then((res) => {
                    res.sort((a, b) => {
                        if (a.refine_level > b.refine_level) return 1;
                        if (a.refine_level < b.refine_level) return -1;

                        if (a.try_count > b.try_count) return 1;
                        if (a.try_count < b.try_count) return -1;
                        
                        if (a.quality > b.quality) return 1;
                        if (a.quality < b.quality) return -1;

                        return 0;
                    })

                    return res.map(refine => {
                        const itemColor = refine.refine_level < 20 ? "유물" : "고대";
                        const refineLevel = refine.refine_level < 20 ? refine.refine_level : refine.refine_level - 8;

                        return `[${refine.quality}] [${itemColor}] ${refineLevel}강 (장기 ${Math.round(Math.min(refine.try_count * refineData[refine.refine_level][3], 1) * 10000) / 100}%) - ${refine.user_name}`
                    }).join("\n");
                })
                .catch(() => `랭킹 조회에 실패했습니다.`)
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
            return `마지막 시도 이후 1분이 지나지 않았습니다. 남은시간 : ${60 - Math.round(elapsedTime/1000)} 초`
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
                    
                    noticeCallback(`장기백으로 [${itemColor}] ${refineLevel + 1}강 강화에 성공했습니다.`);
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
    if(keyword === "!품질") {
        if(param[0] === "도움말") {
            let emptyMsg = "";
            emptyMsg += `사용법\n`;
            emptyMsg += `!품질\n`;
            emptyMsg += `!품질 조회\n`;
            emptyMsg += `!품질 랭킹\n`;
        
            return emptyMsg;
        }

        const successRate = ((quality) => {
            if(quality === 100) return 0;
            if(quality >= 90) return (10 - quality % 10) * (qualityData[0] / 11);

            const qualityIdx = 9 - Math.floor(quality / 10);
            return qualityData[qualityIdx - 1] + (qualityData[qualityIdx] - qualityData[qualityIdx - 1]) / 10 * (9 - quality % 10);
        });

        if(param[0] === "조회") {
            return pgClient
                .query(minigameDao.select, [discordId])
                .then((res) => {
                    const data = res[0];

                    return `현재 품질은 ${data.quality} 입니다.\n품질작 시도 시 성공 확률은 ${Math.round(successRate(data.quality) * 100)/100}% 입니다.`
                })
                .catch(() => "품질 수치 조회에 실패했습니다.")
        }

        if(param[0] === "랭킹") {
            return pgClient
                .query(minigameDao.selectAll)
                .then((res) => {
                    res.sort((a, b) => {
                        if (a.quality > b.quality) return 1;
                        if (a.quality < b.quality) return -1;

                        if (a.refine_level > b.refine_level) return 1;
                        if (a.refine_level < b.refine_level) return -1;

                        if (a.try_count > b.try_count) return 1;
                        if (a.try_count < b.try_count) return -1;

                        return 0;
                    })

                    return res.map(data => {
                        const itemColor = data.refine_level < 20 ? "유물" : "고대";
                        const refineLevel = data.refine_level < 20 ? data.refine_level : data.refine_level - 8;

                        return `[${data.quality}] [${itemColor}] ${refineLevel}강 (장기 ${Math.round(Math.min(data.try_count * refineData[data.refine_level][3], 1) * 10000) / 100}%) - ${data.user_name}`
                    }).join("\n");
                })
                .catch(() => `랭킹 조회에 실패했습니다.`)
        }

        const res = await pgClient.query(minigameDao.select, [discordId]);
        const data = res[0];

        const elapsedTime = new Date().getTime() - data.last_execute_time;
        if(elapsedTime < 1000 * 60) {
            return `마지막 시도 이후 1분이 지나지 않았습니다. 남은시간 : ${60 - Math.round(elapsedTime/1000)} 초`
        }

        if(param[0] === "제작") {

            const newQuality = getQuality();
    
            return pgClient
                .query(minigameDao.qualityUpdate, [newQuality, discordId, new Date().getTime()])
                .then(() => {
                    if(data.quality <= 10 || data.quality >= 90) {
                        noticeCallback(`${data.quality} 품질의 신규 장비를 제작하셨습니다.`);
                    }
                    return `신규 장비를 제작했습니다. (초기 품질 : ${newQuality})`
                })
                .catch(() => `품질작에 오류가 발생했습니다.`)
        }

        const newQuality = getQuality();

        if(data.quality < newQuality) {
            return pgClient
                .query(minigameDao.qualityUpdate, [newQuality, discordId, new Date().getTime()])
                .then(() => {
                    if(newQuality >= 90) {
                        noticeCallback(`${newQuality} 품질작에 성공하셨습니다.`);
                    }
                    return `${Math.round(successRate(data.quality) * 100)/100}% 확률을 뚫고 품질작에 성공했습니다. (${data.quality} => ${newQuality})`
                })
                .catch(() => `품질작에 오류가 발생했습니다.`)
        } else {
            return pgClient
                .query(minigameDao.qualityUpdate, [data.quality, discordId, new Date().getTime()])
                .then(() => {
                    if(data.quality <= 10) {
                        noticeCallback(`${data.quality} 에서 품질작에 실패하셨습니다.`);
                    }
                    return `${Math.round(successRate(data.quality) * 100)/100}% 확률을 뚫지 못하고 품질작에 실패했습니다. (현재 품질 : ${data.quality})`
                })
                .catch(() => `품질작에 오류가 발생했습니다.`)
        }
    }
}

module.exports = {
    minigame: minigame
}
