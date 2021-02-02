'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('authors', [{
      name: 'Vasia',
      rating: 8,
      phone: '800-325325',
      email: 'vasia@vasia.com',
    },{
      name: 'Dima',
      rating: 7,
      phone: '800-444555',
      email: 'dima@dima.com',
    }])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('author', {});
  }
};
