import axios from 'axios';

const apiPostSale = async (token, objSale) => {
  const url = 'http://localhost:3001/orders';

  const result = await axios.get(url, objSale, {
    headers: {
      Authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default apiPostSale;
