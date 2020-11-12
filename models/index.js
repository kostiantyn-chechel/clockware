const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        logging: false, // <--- Disable logging
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        define: {
            timestamps: false
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.clients = require('./client.model')(sequelize, Sequelize);
db.cities = require('./city.model')(sequelize, Sequelize);
db.masters = require('./master.model')(sequelize, Sequelize);
db.orders = require('./order.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.token = require('./token.model')(sequelize, Sequelize);
db.reviews = require('./review.model')(sequelize, Sequelize);

db.cities.hasMany(db.masters);
db.masters.belongsTo(db.cities);

db.cities.hasMany(db.orders);
db.orders.belongsTo(db.cities, { as: 'order_city', foreignKey: 'cityId', targetKey: 'id' });
db.masters.hasMany(db.orders);
db.orders.belongsTo(db.masters, { as: 'order_master', foreignKey: 'masterId', targetKey: 'id' });
db.clients.hasMany(db.orders);
db.orders.belongsTo(db.clients, { as: 'order_client', foreignKey: 'clientId', targetKey: 'id' });

db.orders.hasOne(db.reviews);
db.reviews.belongsTo(db.orders, { as: 'review_order', foreignKey: 'orderId', targetKey: 'id' });
db.masters.hasMany(db.reviews);
db.reviews.belongsTo(db.masters, { as: 'review_master', foreignKey: 'masterId', targetKey: 'id' });


module.exports = db;
