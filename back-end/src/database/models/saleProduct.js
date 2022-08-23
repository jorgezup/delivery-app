module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    "saleProduct",
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscore: true,
      tableName: "salesProducts",
    }
  );
  saleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: saleProduct,
      foreignKey: "sale_id",
      otherKey: "product_id",
      as: "products",
    });
    models.Product.belongsToMany(models.Sale, {
      through: saleProduct,
      foreignKey: "product_id",
      otherKey: "sale_id",
      as: "sales",
    });
  };
  return saleProduct;
};
