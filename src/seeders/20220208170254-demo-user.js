'use strict';
var bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    
  

       await queryInterface.bulkInsert('Stuff', [
         {
          phone_number:22361910,
          user_name: "admin",
          email: "admin@test.com",
          hashed_password : bcrypt.hashSync("admin", 8),
          role: "Admin"
          } 
       ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
