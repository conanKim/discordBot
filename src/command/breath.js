let price;

const getBreath = (param) => {
    if (!price) return "풀숨 가격을 먼저 설정해주세요.";
    if (param.length !== 3) return "풀숨 수량 입력이 잘못되었습니다.";

    return `${price[0] * param[0]} ${price[1] * param[1]} ${price[2] * param[2]}`;
};

const setBreath = (param) => {
    if (param.length !== 3) return "풀숨 가격 입력이 잘못되었습니다.";
    price = param;
    return "풀숨 가격 설정 완료";
};

module.exports = {
    getBreath,
    setBreath,
};
