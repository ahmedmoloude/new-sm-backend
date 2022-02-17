const moment = require("moment")


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
    product_id: DataTypes.INTEGER,
    restaurant_id: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      get: function() { 
        return  moment(this.getDataValue('createdAt'))
          .format('DD-MM-YYYY h:mm:ss');
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      get: function() { 
        return  moment(this.getDataValue('updatedAt'))
          .format('DD-MM-YYYY h:mm:ss');
      }
    },
  }, {
    sequelize,
    modelName: 'Restaurant_inter_product',
  });
  return Restaurant_inter_product;
};