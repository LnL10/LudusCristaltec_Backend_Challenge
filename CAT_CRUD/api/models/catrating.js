'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CatRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CatRating.belongsTo(models.Cat, { foreignKey: 'catId' });
    }
  }
  CatRating.init({
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CatRating',
  });
  
  return CatRating;
};