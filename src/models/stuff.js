'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stuff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate(models) {
      Stuff.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
        onDelete: 'CASCADE',
      });
    }
  
  }
  Stuff.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue : "Manager",
    },
    phone_number: DataTypes.INTEGER,
    fcm_token: DataTypes.STRING,
    hashed_password: DataTypes.STRING(64)
  }, {
    sequelize,
    modelName: 'Stuff',
  });
  return Stuff;
};