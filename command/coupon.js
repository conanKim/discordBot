const parseCultureCoupon = (param) => {
    const result = param.reduce((prev, curr, index) => {
        prev += `${curr.substring(0, 4)}\t`;
        prev += `${curr.substring(4, 8)}\t`;
        prev += `${curr.substring(8, 12)}\t`;
        prev += `${curr.substring(13, 19)}\n`;
        if ((index + 1) % 5 === 0) {
            prev += `\n`;
        }
        return prev;
    }, "");

    return result;
};

module.exports = {
    parseCultureCoupon,
};
