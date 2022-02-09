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
  
  }
  Stuff.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue : "Manager",
    },
    phone_number: DataTypes.INTEGER,
    hashed_password: DataTypes.STRING(64)
  }, {
    sequelize,
    modelName: 'Stuff',
  });
  return Stuff;
};