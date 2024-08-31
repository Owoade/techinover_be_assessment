'use strict';
const {PRODUCT_TABLE_NAME, ProductSchema} = require("../../../dist/db/schema/product")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable(PRODUCT_TABLE_NAME, ProductSchema)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable(PRODUCT_TABLE_NAME)
  }
};