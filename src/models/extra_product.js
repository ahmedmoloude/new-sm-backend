const moment = require("moment")


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
      Extra_product.belongsTo(models.Category_extra, {
        foreignKey: 'category_extra_id',
        as : "category_extra",
        onDelete: 'CASCADE',
      });

      Extra_product.belongsToMany(models.Product, {
        through: "Product_inter_productExtra",
        as: "products",
        foreignKey: "product_extra_id",
      });
    
    }
  }
  Extra_product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price : DataTypes.DOUBLE,
    category_extra_id : DataTypes.INTEGER,
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
    modelName: 'Extra_product',
  });
  return Extra_product;
};