'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    
       await queryInterface.bulkInsert('Staff', [
         {
          phone_number:22361910,
          user_name: "admin",
          email: "admin@test.com",
          hashed_password : bcrypt.hashSync("123456", 8),
          role: "Admin",
          fcm_token : ""
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
