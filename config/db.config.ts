require('dotenv').config();

module.exports = {
    development: {
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
    },
    test: {
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
    },
    production:{
        HOST: process.env.CW_DB_HOST,
        USER: process.env.CW_DB_USER,
        PASSWORD: process.env.CW_DB_PASSWORD,
        DB: process.env.CW_DB_NAME,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};
