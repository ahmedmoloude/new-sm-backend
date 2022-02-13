'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant_inter_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Restaurant_inter_product.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurant_inter_product',
  });
  return Restaurant_inter_product;
};