export interface MasterAttributes {
    id?: number,
    name: string,
}

module.exports = (sequelize: any, Sequelize: any): MasterAttributes => {
    const Master = sequelize.define('master', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return Master;
};