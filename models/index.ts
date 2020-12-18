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

type DBType = {
    Sequelize: any,
    sequelize: any,
    clients: any,
    cities: any,
    masters: any,
    orders: any,
    users: any,
    tokens: any,
    reviews: any,
}

const db: DBType = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    clients: require('./client.model')(sequelize, Sequelize),
    cities: require('./city.model')(sequelize, Sequelize),
    masters: require('./master.model')(sequelize, Sequelize),
    orders: require('./order.model')(sequelize, Sequelize),
    users: require('./user.model')(sequelize, Sequelize),
    tokens: require('./token.model')(sequelize, Sequelize),
    reviews: require('./review.model')(sequelize, Sequelize)
};

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

db.clients.hasOne(db.users);
db.users.belongsTo(db.clients, {as: 'user_client', foreignKey: 'clientId', targetKey: 'id'});

module.exports = db;
