const pgClient = require("../dao");
const adminDao = require("../dao/admin");

const backup = async () => {
    const fs = require('fs')

    const tables = await pgClient.query(adminDao.dbList)
    .then((tables) => tables.map(table => table.table_name))
    .catch(() => null);
    
    if(!tables) {
        return "ERROR";
    }

    console.log(tables);

    await Promise.all(
        tables.map(async table => await pgClient.query(`SELECT * FROM ${table}`)
            .then((res) => {
                return new Promise((resolve, reject) => {
                    try {
                        fs.writeFile(`./backups/${table}.txt`, JSON.stringify(res, null, 2), err => {
                            if (err) {
                                console.log(err)
                                return reject();
                            }
                            //file written successfully
                            return resolve();
                        })
                    } catch(e) {
                        console.log(e); 
                        return "ERROR"
                    }
                })
            }).catch((err) => {
                console.log(err);
                return "ERROR"
            })
        )
    )
    
}

const adminCommand = async ([keyword, ...param] = [], discordId) => {
    let emptyMsg = "";
    emptyMsg += `사용법\n`;
    emptyMsg += `!관리자 초기화\n`;

    if (!keyword) {
        return emptyMsg;
    }

    if (keyword === "초기화") {
        return pgClient
            .query(adminDao.reset, param)
            .then(() => pgClient.schema())
            .then(() => "DB가 초기화 되었습니다.")
            .catch(() => "DB 초기화에 실패했습니다.");
    }

    if (keyword === "테스트") {
        return pgClient.test()
            .then(() => "DB가 초기화 되었습니다.")
            .catch(() => "DB 초기화에 실패했습니다.");
    }

    if (keyword === "백업") {
        return backup()
            .then(() => "DB백업이 완료되었습니다.")
            .catch(() => "DB백업에 실패 했습니다.");
    }

    return "잘못된 명령어 입니다.";
};

module.exports = {
    adminCommand,
};
