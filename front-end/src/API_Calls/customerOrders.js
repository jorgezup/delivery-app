import axios from 'axios';

const customerOrders = async (token, id) => {
  try {
    const { data } = await axios.get(`/orders/clients/${id}`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export default customerOrders;
