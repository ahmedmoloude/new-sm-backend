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
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM("created" , "processing", "picked_up", "delivred" , "canceled" , "ready_to_be_picked"),
        defaultValue: "created"
      },
      client_position: {
        type: Sequelize.GEOMETRY('POINT')
      },
      delievry_boy_position: {
        type: Sequelize.GEOMETRY('POINT')
      },
      paiement_methode: {
        type: Sequelize.ENUM("Cash_on_delivery" , "Bankily", "Masrvi", "Stripe"),
      },
      order_amount : {
        type: Sequelize.DOUBLE
      },
      delivery_fee : {
        type: Sequelize.DOUBLE
      },
      amount_total : {
        type: Sequelize.DOUBLE
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Restaurants',
          key: 'id',
          as: 'restaurant_id',
        },
      },
      delivery_boy_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'DeliveryBoys',
          key: 'id',
          as: 'delivery_boy_id',
        },
      },
      client_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Clients',
          key: 'id',
          as: 'client_id',
        },
      },
      manager_id: {
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