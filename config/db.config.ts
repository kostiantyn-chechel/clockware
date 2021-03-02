require('dotenv').config();

// module.exports = {
//     HOST: process.env.CW_DB_HOST,
//     USER: process.env.CW_DB_USER,
//     PASSWORD: process.env.CW_DB_PASSWORD,
//     DB: process.env.CW_DB_NAME,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

const prodDBSetting = {
    HOST: process.env.CW_DB_HOST!,
    USER: process.env.CW_DB_USER!,
    PASSWORD: process.env.CW_DB_PASSWORD!,
    DB: process.env.CW_DB_NAME!,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const devDBSetting = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'clockware',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const testDBSetting = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'test-clockware',
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

const workingProcess = process.env.NODE_ENV;

let configSettings = devDBSetting;
if (workingProcess === 'production') configSettings = prodDBSetting;
if (workingProcess === 'test') configSettings = testDBSetting;


module.exports = () => configSettings;