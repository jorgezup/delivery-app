"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SalesProducts", {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Sales",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
        field: "sale_id",
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
        field: "product_id",
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("SalesProducts");
  },
};
