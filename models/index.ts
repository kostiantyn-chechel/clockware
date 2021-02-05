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
    cities: any,
    orders: any,
    users: any,
    reviews: any,
    posts: any,
}

const db: DBType = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    cities: require('./city.model')(sequelize, Sequelize),
    orders: require('./order.model')(sequelize, Sequelize),
    users: require('./user.model')(sequelize, Sequelize),
    reviews: require('./review.model')(sequelize, Sequelize),
    posts: require('./post.model')(sequelize,Sequelize),
};

db.cities.hasMany(db.users);
db.users.belongsTo(db.cities, { as: 'user_city', foreignKey: 'cityId', targetKey: 'id'});

db.cities.hasMany(db.orders);
db.orders.belongsTo(db.cities, { as: 'order_city', foreignKey: 'cityId', targetKey: 'id' });

db.users.hasMany(db.orders, {as: 'master_orders', foreignKey: 'masterId'});
db.orders.belongsTo(db.users, {as: 'order_user', foreignKey: 'userId', targetKey: 'id'});
db.orders.belongsTo(db.users, {as: 'order_master', foreignKey: 'masterId', targetKey: 'id'});

db.orders.hasOne(db.reviews);
db.reviews.belongsTo(db.orders, { as: 'review_order', foreignKey: 'orderId', targetKey: 'id' });

db.users.hasMany(db.reviews);
db.reviews.belongsTo(db.users, { as: 'review_user', foreignKey: 'userId', targetKey: 'id'});

module.exports = db;
