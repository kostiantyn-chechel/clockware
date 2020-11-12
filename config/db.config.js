require('dotenv').config();

module.exports = {
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
};


