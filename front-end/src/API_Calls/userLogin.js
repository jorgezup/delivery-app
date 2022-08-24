import axios from 'axios';

const userLogin = async (objBody) => {
  const url = '...';

  const result = await axios.post(url, objBody)
    .then((response) => response.data).catch((error) => error);

  console.log(result);
  return result;
};

export default userLogin;
