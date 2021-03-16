import { TUserStatus } from "../Type/interfaces";

export interface UserAttributes {
    id?: number
    status: TUserStatus
    name: string
    login: string
    password: string
    salt: number
}

module.exports = (sequelize: any, Sequelize: any): UserAttributes => {
    const User = sequelize.define('user', {
        status: { // TUserStatus = 'client' | 'admin' | 'notAuth'
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        login: { // email
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        salt: {
            type: Sequelize.STRING,
            allowNull: true
        },
        colorId: {
            type: Sequelize.STRING,
        }
    });

    return User;
};
