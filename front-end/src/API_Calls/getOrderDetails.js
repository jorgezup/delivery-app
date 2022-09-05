import axios from 'axios';

const listOrders = async (orderId, token) => {
  const url = `http://localhost:3001/customer/orders/${orderId}`;

  const result = await axios.get(url, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default listOrders;
