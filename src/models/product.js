const moment = require("moment")


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Restaurant, {
        through: "Restaurant_inter_product",
        as: "restaurants",
        foreignKey: "product_id",
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    image : DataTypes.STRING,
    description : DataTypes.STRING,
    price : DataTypes.DOUBLE,
    rating : DataTypes.INTEGER,
    category_id : DataTypes.INTEGER,
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
    modelName: 'Product',
  });
  return Product;
};