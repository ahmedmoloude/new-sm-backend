'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clients', {
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
      email: {
        type: Sequelize.STRING,
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
      client_is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      external_auth_id: {
        type: Sequelize.STRING,
      },
      fcm_token : {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Clients');
  }
};