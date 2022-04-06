const { MessageEmbed } = require("discord.js");

const getGoldEmbed = () => {
    const goldEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setAuthor({
            name: "컨텐츠 별 골드 보상",
        })
        .addFields(
            { name: "발탄 노말", value: "2500 (500 + 2000)" },
            { name: "비아키스 노말", value: "2500 (500 + 600 + 1400)" },
            { name: "발탄 하드", value: "4500 (1000 + 3500)" },
            { name: "비아키스 노말", value: "4500 (1000 + 1000 + 2500)" },
            { name: "쿠크세이튼 노말", value: "4500 (1000 + 1000 + 2500)" },
            { name: "아브렐슈드 노말", value: "8500 (4500 + 1500 + 2500)" },
            { name: "아브렐슈드 하드", value: "10500 (5500 + 2000 + 3000)" }
        );

    return { embeds: [goldEmbed] };
};

module.exports = {
    getGoldEmbed,
};
