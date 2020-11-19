'use strict';

const bcrypt = require('bcryptjs')
let adminPassword = bcrypt.hashSync('1234', 10)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
      email: 'admin@mail.com',
      password: adminPassword,
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },



  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};