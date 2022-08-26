import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

async function postRegister(name, email, password) {
  const user = await axios.post('/register', {
    name,
    email,
    password,
  });
  return user;
}

export default postRegister;
