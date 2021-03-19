export interface OrderAttributes {
    id?: number
    date: string
    time: string
    hours: number
    photoUrl: string
}

module.exports = (sequelize: any, Sequelize: any): OrderAttributes => {
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
        orderStatus: {
            type: Sequelize.STRING,
            // allowNull: false
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        costStatus: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

    });

    return Order;
};