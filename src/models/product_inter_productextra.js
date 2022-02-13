'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_inter_productExtra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_inter_productExtra.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product_inter_productExtra',
  });
  return Product_inter_productExtra;
};