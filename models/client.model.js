module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('client', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Client;
};