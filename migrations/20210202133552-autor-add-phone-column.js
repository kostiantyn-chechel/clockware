'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
          queryInterface.addColumn('authors', 'phone', {
            type: Sequelize.STRING
          }, { transaction: t }),
          queryInterface.addColumn('authors', 'email', {
            type: Sequelize.STRING
          }, { transaction: t }),
      ])
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
          queryInterface.removeColumn('authors', 'phone', { transaction: t}),
          queryInterface.removeColumn('authors', 'email', { transaction: t}),
      ])
    })
  }
};
