const moment = require("moment")

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }


    getInformation() {
      return {user_name : this.user_name , email : this.email ,  phone_number : this.phone_number ,external_auth_id : this.external_auth_id , 
            fcm_token : this.fcm_token , client_is_active : this.client_is_active , createdAt :  this.createdAt , 
            updatedAt : this.updatedAt};
    }
  }
  Client.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.INTEGER,
    hashed_password: DataTypes.STRING(64),
    external_auth_id : DataTypes.STRING,
    fcm_token : DataTypes.STRING,
    client_is_active :  DataTypes.BOOLEAN,
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
    modelName: 'Client',
  });
  return Client;
};