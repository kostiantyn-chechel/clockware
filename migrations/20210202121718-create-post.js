'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post: {
        type: Sequelize.STRING
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // model: { // not working !!!???
          //   tableName: 'authors',
          //   schema: 'post_author',
          // },
          model:  'authors',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        // onDelete: 'SET NULL', // not working !!!???
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Posts');
  }
};