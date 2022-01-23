const getHomework = () => {
    const now = new Date();
    const WEEKDAY = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const data = {
        SUN: [1, 1, 0],
        MON: [1, 0, 0],
        TUE: [0, 1, 1],
        WED: [0, 0, 0],
        THU: [1, 0, 1],
        FRI: [0, 1, 0],
        SAT: [1, 0, 1],
    };
    const todayData = data[WEEKDAY[now.getDay()]];
    const homework = {
        카오스게이트: todayData[0],
        필드보스: todayData[1],
        유령선: todayData[2],
    };

    const todayHomework = Object.keys(homework).filter((name) => homework[name]);
    return todayHomework.join(", ");
};

module.exports = {
    getHomework,
};
