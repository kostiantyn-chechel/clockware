export interface UserAttributes {
    id?: number
    login: string
    password: string
    salt: number
}

module.exports = (sequelize: any, Sequelize: any): UserAttributes => {
    const User = sequelize.define('user', {
        login: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return User;
};
