import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Checkout from '../Components/Checkout';
import Header from '../Components/Header';
import TableProducts from '../Components/TableProducts';

function Custumer() {
  const [arrCar, setArrCar] = useState([]);
  const { location: { pathname } } = useHistory();

  return (
    <div>
      <Header />
      {pathname === '/customer/products'
        ? <TableProducts funcCarrinho={ setArrCar } />
        : <Checkout carrinho={ arrCar } />}
    </div>
  );
}

export default Custumer;
