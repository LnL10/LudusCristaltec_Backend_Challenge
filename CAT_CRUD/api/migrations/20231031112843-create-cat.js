'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
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

    await queryInterface.bulkInsert('Cats', [
      {
        name: 'Faisca',
        age: 3,
        weight: 5.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bruce',
        age: 2,
        weight: 4.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Garfield',
        age: 6,
        weight: 6.0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tom',
        age: 5,
        weight: 2.1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Snow',
        age: 9,
        weight: 5.2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cats');
  }
};