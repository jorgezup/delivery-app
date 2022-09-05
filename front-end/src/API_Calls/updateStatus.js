import axios from 'axios';

const updateStatus = async (token, objBody) => {
  const url = 'http://localhost:3001/customer/orders/status';

  const result = await axios.patch(url, objBody, {
    headers: {
      Authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default updateStatus;
