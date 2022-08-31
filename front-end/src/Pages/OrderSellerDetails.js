import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import DetailsOrderSeller from '../Components/DetailsOrderSeller';
import api from '../API_Calls/api';

function OrderSellerDetails() {
  const [sale, setSale] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pInfo, setPInfo] = useState('');

  const { token } = JSON.parse(localStorage.getItem('user'));

  const handleChangeStatusToPreparing = async () => {
    try {
      await api.patch('/seller/orders/status', {
        status: 'Preparando', id: sale.id }, {
        headers: { Authorization: token },
      });
    } catch (e) {
      setPInfo(e.response.data.message);
    }
  };

  const handleChangeStatusToDispatch = async () => {
    try {
      await api.patch('/seller/orders/status', {
        status: 'Em Trânsito', id: sale.id }, {
        headers: { Authorization: token },
      });
    } catch (e) {
      setPInfo(e.response.data.message);
    }
  };

  useEffect(() => {
    const orderId = window.location.pathname.split('/')[3];
    const getSaleSale = async () => {
      try {
        const { data } = await api.get(`/seller/orders/${orderId}`, {
          headers: { Authorization: token },
        });
        setSale(data);
      } catch (e) {
        setPInfo(e.message.statusText);
      } finally {
        setLoading(false);
      }
    };
    getSaleSale();
  }, [token, sale]);
  return (
    <div>
      {isLoading && <h1>Loading</h1>}
      {pInfo && <h1 style={ { color: 'red' } }>{pInfo}</h1>}
      <h1>Detalhes Ordem Vendedor</h1>
      <Header />
      <DetailsOrderSeller
        sale={ sale }
        handleChangeStatusToPreparing={ handleChangeStatusToPreparing }
        handleChangeStatusToDispatch={ handleChangeStatusToDispatch }
      />
    </div>
  );
}

export default OrderSellerDetails;
