'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.bulkInsert('Tags', [
      {
        name:"White",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"black",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"big",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"small",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"box",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"cute",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tags');
  }
};