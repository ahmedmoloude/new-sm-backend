'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_line_extra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_line_extra.init({
    qte: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order_line_extra',
  });
  return Order_line_extra;
};