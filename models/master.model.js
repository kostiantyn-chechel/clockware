module.exports = (sequelize, Sequelize) => {
    const Master = sequelize.define('master', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Master;
};