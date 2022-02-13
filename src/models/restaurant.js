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
      Restaurant.hasMany(models.Stuff, {
        foreignKey: 'restaurant_id',
        as: 'stuff',
      });
    }
  }
  Restaurant.init({
    name: DataTypes.STRING,
    phone_number : DataTypes.INTEGER,
    localisation: DataTypes.STRING,
    region: DataTypes.STRING,
    statut :  DataTypes.BOOLEAN
    }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};