"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      price: {
        allowNull: false,
        type: Sequelize.DECIMAL(4, 2),
      },
      urlImage: {
        allowNull: false,
        type: Sequelize.STRING(200),
        field: "url_image",
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("Products");
  },
};