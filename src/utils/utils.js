const axios = require("axios");

const putLvupGG = async (bracketId, body, token) => {
    return axios.put(`https://api.lvup.gg/v2/easy-brackets/${bracketId}`, body, {headers: {Authorization: `Bearer ${token}`}})
};

module.exports = {
    putLvupGG
};
