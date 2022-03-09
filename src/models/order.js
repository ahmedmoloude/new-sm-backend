const moment = require("moment")


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    estimated_time : DataTypes.DATE,
    order_amount : DataTypes.DOUBLE,
    delivery_fee : DataTypes.DOUBLE,
    amount_total : DataTypes.DOUBLE,
    restaurant_id : DataTypes.INTEGER,
    delivery_boy_id : DataTypes.INTEGER,
    client_id : DataTypes.INTEGER,
    manager_id : DataTypes.INTEGER,
    client_position : DataTypes.GEOMETRY('POINT'),
    delievry_boy_position : DataTypes.GEOMETRY('POINT'),
    status: {
      type:   DataTypes.ENUM,
      values: ["created" , "processing", "ready_to_be_picked" , "picked_up", "delivred" , "canceled"]
    },
    paiement_methode: {
      type:   DataTypes.ENUM,
      values: ["Cash_on_delivery" , "Bankily", "Masrvi", "Stripe"]
    },
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
    modelName: 'Order',
  });
  return Order;
};