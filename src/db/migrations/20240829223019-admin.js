'use strict';
const {ADMIN_TABLE_NAME, AdminSchema} = require("../../../dist/db/schema/admin")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(ADMIN_TABLE_NAME, AdminSchema)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(ADMIN_TABLE_NAME)
  }
};
