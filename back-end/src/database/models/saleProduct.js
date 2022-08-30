module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    "saleProduct",
    {
     saleId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'Sales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: { model: 'Products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "sales_products",
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

