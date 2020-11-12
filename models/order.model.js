module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('order', {
        date: {
            type: Sequelize.DATE,
            allowNull: false
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        hours: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        photoURL: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Order;
};