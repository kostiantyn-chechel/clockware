module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define('city', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return City;
};