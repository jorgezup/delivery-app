import axios from 'axios';

const listProducts = async (token) => {
  console.log('token', token);
  const url = 'http://localhost:3001/products';

  const result = await axios.get(url, {
    headers: {
      authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default listProducts;
