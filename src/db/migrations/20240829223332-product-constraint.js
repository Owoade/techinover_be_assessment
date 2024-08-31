'use strict';

const { PRODUCT_TABLE_NAME } = require("../../../dist/db/schema/product");
const { USER_TABLE_NAME } = require("../../../dist/db/schema/user");

console.log({
  PRODUCT_TABLE_NAME,
  USER_TABLE_NAME
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add foreign key constraint to the UserId field in the Products table
    await queryInterface.addConstraint(PRODUCT_TABLE_NAME, {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fk_products_user_id',  // Custom name for the foreign key constraint
      references: {
        table: USER_TABLE_NAME, // Reference the Users table
        field: 'id',  // Primary key in the Users table
      },
      onDelete: 'CASCADE', // Delete products when the associated user is deleted
      onUpdate: 'CASCADE'  // Update UserId in products when the associated user's id is updated
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the foreign key constraint
    await queryInterface.removeConstraint(PRODUCT_TABLE_NAME, 'fk_products_user_id');
  }
};
