const db = require('../../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('cities', [{
            name: 'Dnipro2',
        },{
            name: 'Lviv2',
        },{
            name: 'Kyiv2',
        }])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('cities', {});
    }
};