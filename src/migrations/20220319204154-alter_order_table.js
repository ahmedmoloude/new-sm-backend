'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Orders', 
        'potentail_delivery_boys',
        {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: true,
          defaultValue: []
        },
      )
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Orders', 'potentail_delivery_boys')
    ]);
  }
};
