'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      estimated_time: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM("created" , "processing", "picked_up", "delivred" , "canceled"),
        defaultValue: "created"
      },
      //TODO: add geo localisation delivery boy and client
      paiement_methode: {
        allowNull: false,
        type: Sequelize.ENUM("Cash_on_delivery" , "Bankily", "Masrvi", "Stripe"),
      },
      order_amount : {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      delivery_fee : {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      amount_total : {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      restaurant_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Restaurants',
          key: 'id',
          as: 'restaurant_id',
        },
      },
      delivery_boy_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'DeliveryBoys',
          key: 'id',
          as: 'delivery_boy_id',
        },
      },
      client_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Clients',
          key: 'id',
          as: 'client_id',
        },
      },
      manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Staff',
          key: 'id',
          as: 'manager_id',
        },
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
    await queryInterface.dropTable('Orders');
  }
};