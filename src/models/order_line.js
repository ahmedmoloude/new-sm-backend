const moment = require("moment")

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_line extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    
      Order_line.belongsTo(models.Order, {
        sourceKey : 'id',
        foreignKey: 'order_id',
        as : "order_line",
        onDelete: 'CASCADE',
      });
    }
  }
  Order_line.init({
    qte: DataTypes.INTEGER,
    order_id : DataTypes.INTEGER,
    product_id : DataTypes.INTEGER,
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
    modelName: 'Order_line',
  });
  return Order_line;
};