const calcDutchPay = (param) => {
    const price = param[0];
    const n = param[1] || 8;
    const sellPrice = Math.round((price * 0.95 * (n - 1)) / n);
    let priceMsg = `${price}골 ${n}인빵\n`;
    priceMsg += `균등가 : ${sellPrice}\n`;
    priceMsg += `선점가 : ${Math.round(sellPrice / 1.1)}`;

    return priceMsg;
};

module.exports = {
    calcDutchPay,
};
