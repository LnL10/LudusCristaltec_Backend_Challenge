'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CatRatings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rating: {
        type: Sequelize.INTEGER
      },
      CatId:{
        type:Sequelize.INTEGER,
        references: {
          model: 'Cats',
          key: 'id',
        },
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

    await queryInterface.bulkInsert('CatRatings', [
      {
        rating: 8,
        CatId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rating:5,
        CatId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rating:9,
        CatId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rating:2,
        CatId:4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rating:1,
        CatId:5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CatRatings');
  }
};