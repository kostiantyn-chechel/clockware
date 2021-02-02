'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: Sequelize.STRING,
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authors');
  }
};