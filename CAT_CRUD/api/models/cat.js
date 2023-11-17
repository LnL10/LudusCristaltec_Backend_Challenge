'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cat.hasMany(models.CatRating, { foreignKey: 'catId' });
      Cat.belongsToMany(models.Tag, { through: 'CatTag', as: 'tags', foreignKey: 'catId' });

    }
  }
  Cat.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cat',
  });
  return Cat;
};