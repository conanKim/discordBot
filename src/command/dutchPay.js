const calcDutchPay = (param) => {
    const price = param[0];
    let priceMsg = `${price}골\n\n`;
    const sellPrice8 = Math.round((price * 0.95 * (8 - 1)) / 8);
    const sellPrice4 = Math.round((price * 0.95 * (4 - 1)) / 4);
    priceMsg += `8인 기준\n`;
    priceMsg += `균등가 : ${sellPrice8}\n`;
    priceMsg += `선점가 : ${Math.round(sellPrice8 / 1.1)}\n\n`;
    
    priceMsg += `4인 기준\n`;
    priceMsg += `균등가 : ${sellPrice4}\n`;
    priceMsg += `선점가 : ${Math.round(sellPrice4 / 1.1)}`;

    return priceMsg;
};

module.exports = {
    calcDutchPay,
};
