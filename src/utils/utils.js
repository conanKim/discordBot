import axios from "axios";

const putLvupGG = async (bracketId, body, token) => {
    return axios.put(`https://api.lvup.gg/v2/easy-brackets/${bracketId}`, body, {headers: {Authorization: `Bearer ${token}`}})
        .then(res => {console.log(res); return res})
        .catch(e => {console.log(e); throw new Error(e)})
};

export default {
    putLvupGG
};
