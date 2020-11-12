module.exports = (sequelize, Sequelize) => {
    const Token = sequelize.define('token', {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Token;
};