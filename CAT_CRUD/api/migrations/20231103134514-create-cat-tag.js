'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CatTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      catId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cats',
          key: 'id',
        },
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
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
    await queryInterface.bulkInsert('CatTags', [
      {
        catId:1,
        tagId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:1,
        tagId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:1,
        tagId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:2,
        tagId:4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:2,
        tagId:5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:2,
        tagId:6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:3,
        tagId:5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:4,
        tagId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        catId:5,
        tagId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CatTags');
  }
};