const order = {
  id: 1,
  userId: 3,
  sellerId: 2,
  totalPrice: '37.45',
  deliveryAddress: 'Rua São Paulo',
  deliveryNumber: '123',
  saleDate: '2022-08-28T09:00:00.000Z',
  status: 'Pendente',
  user_id: 3,
  seller_id: 2,
  products: [
    {
      id: 2,
      name: 'Heineken 600ml',
      price: '7.50',
      urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
      saleProduct: {
        saleId: 1,
        productId: 2,
        quantity: 1,
        sale_id: 1,
        product_id: 2,
      },
    },
    {
      id: 3,
      name: 'Antarctica Pilsen 300ml',
      price: '2.49',
      urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
      saleProduct: {
        saleId: 1,
        productId: 3,
        quantity: 4,
        sale_id: 1,
        product_id: 3,
      },
    },
    {
      id: 7,
      name: 'Becks 330ml',
      price: '4.99',
      urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
      saleProduct: {
        saleId: 1,
        productId: 7,
        quantity: 5,
        sale_id: 1,
        product_id: 7,
      },
    },
  ],
  sales: {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  },
};

export default order;
