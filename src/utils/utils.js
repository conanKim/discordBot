const axios = require("axios");

const putLvupGG = async (body, token) => {
    return axios.put(`https://api.lvup.gg/v2/easy-brackets/665aa0d65b276900074cb1dd`, body, {headers: {Authorization: `Bearer ${token}`}});
};

module.exports = {
    putLvupGG
};
