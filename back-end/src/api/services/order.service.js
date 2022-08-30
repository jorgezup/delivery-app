const Sequelize = require('sequelize');
const { Sale, User, saleProduct } = require('../../database/models');
const config = require('../../database/config/config');

const sequelize = new Sequelize(config.development);

const getAllOrdersByClient = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  console.log(id);
  const orders = await Sale.findAll({ where: { userId: id } });

  return orders;
};

const createOrder = async ({ sale, products }) => {
  const transaction = await sequelize.transaction();
  
  try {
    const insertSale = await Sale.create(sale);
    console.log(insertSale.id);
    const productsArray = products.map(({ productId, quantity }) => ({
      saleId: insertSale.id,
      productId,
      quantity,
    }));
    await saleProduct.bulkCreate(productsArray);
    await transaction.commit();
  } catch (er) {
    await transaction.rollback();
    console.log(er);
  }
  
  // Promise.all(products.map(async ({productId, quantity}) => {
  //   console.log(productId, quantity);
  //   console.log('createOrder')
  //   const insert = {
  //     saleId: insertSale.id,
  //     productId,
  //     quantity,
  //   }
    // return await saleProduct.create(insert);
    // }
  // ))
};

module.exports = {
  getAllOrdersByClient,
  createOrder,
};