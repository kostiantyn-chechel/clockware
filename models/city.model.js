// import * as Sequelize from "sequelize";
//
// export interface CityAttributes {
//     id?: number,
//     name: string,
// }
//
// export interface CityInstance extends Sequelize.Model<CityAttributes>, CityAttributes {}

module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define('city', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });

    return City;
};