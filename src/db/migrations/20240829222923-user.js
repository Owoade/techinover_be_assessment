'use strict';
const {USER_TABLE_NAME, UserSchema} = require("../../../dist/db/schema/user")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(USER_TABLE_NAME, UserSchema)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(USER_TABLE_NAME)
  }
};