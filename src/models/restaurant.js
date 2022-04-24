const moment = require("moment")


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      Restaurant.hasMany(models.Staff, {
        foreignKey: 'restaurant_id',
        as: 'staff',
      });     
      Restaurant.belongsToMany(models.Product, {
        through: "Restaurant_inter_product",
        as: "products",
        foreignKey: "restaurant_id",
      });
      
    }
  }
  Restaurant.init({
    name: DataTypes.STRING,
    phone_number : DataTypes.INTEGER,
    localisation: DataTypes.GEOMETRY('POINT'),
    region: DataTypes.STRING,
    statut :  DataTypes.BOOLEAN,
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
    modelName: 'Restaurant',
  });
  return Restaurant;
};