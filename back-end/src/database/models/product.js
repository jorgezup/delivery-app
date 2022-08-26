module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING(200),
    },
    {
      timestamps: false,
      underscored: true,
      tableName: "products"
    }
  );
};
