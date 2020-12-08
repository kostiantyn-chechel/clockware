export interface TokenAttributes {
    id?: number
    token: string
}

module.exports = (sequelize: any, Sequelize: any): TokenAttributes => {
    const Token = sequelize.define('token', {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Token;
};