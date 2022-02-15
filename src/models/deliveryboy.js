'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryBoy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  DeliveryBoy.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    hashed_password: DataTypes.STRING(64),
    adresse : DataTypes.STRING,
    fcm_token : DataTypes.STRING,
    statut:  DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'DeliveryBoy',
  });
  return DeliveryBoy;
};