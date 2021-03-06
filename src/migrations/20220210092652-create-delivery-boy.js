'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DeliveryBoys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adresse: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          }
      }},
      hashed_password: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      current_command: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      fcm_token : {
        type: Sequelize.STRING,
      },
      statut: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      rating : {
        allowNull: false,
        type: Sequelize.DOUBLE,
        defaultValue : 0,
        validate : {
          max : 5
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DeliveryBoys');
  }
};