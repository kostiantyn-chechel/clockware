module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('cities', [{
            name: 'Dnipro',
        },{
            name: 'Lviv',
        },{
            name: 'Kyiv',
        }])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('cities', {});
    }
};