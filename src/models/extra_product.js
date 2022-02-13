'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Extra_product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Extra_product.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Extra_product',
  });
  return Extra_product;
};