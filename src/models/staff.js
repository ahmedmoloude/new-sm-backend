const moment = require("moment")

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

     static associate(models) {
      Staff.belongsTo(models.Restaurant, {
        foreignKey: 'restaurant_id',
        as : "restaurant",
        onDelete: 'CASCADE',
      });
    }
  
  }
  Staff.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: {
      type: DataTypes.STRING,
      defaultValue : "Manager",
    },
    phone_number: DataTypes.INTEGER,
    fcm_token: DataTypes.STRING,
    hashed_password: DataTypes.STRING(64),
    restaurant_id : DataTypes.INTEGER,
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
    modelName: 'Staff',
  });
  return Staff;
};