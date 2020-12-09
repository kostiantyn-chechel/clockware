export interface ClientAttributes {
    id?: number
    name: string
    email: string
}

module.exports = (sequelize: any, Sequelize: any): ClientAttributes => {
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