import axios from 'axios';

const getSellers = async (token) => {
  const url = 'http://localhost:3001/users/sellers';

  const result = await axios.get(url, {
    headers: {
      Authorization: token,
    },
  }).then((response) => response.data).catch((error) => error.response.data.message);

  return result;
};

export default getSellers;
