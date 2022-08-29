import React, { useState } from 'react';
import Checkout from '../Components/Checkout';
import Header from '../Components/Header';
import TableProducts from '../Components/TableProducts';

function Custumer() {
  const [exibitProducts, setExibitProducts] = useState(true);
  const [arrCar, setArrCar] = useState([]);

  return (
    <div>
      <Header />
      {exibitProducts
        ? <TableProducts funcExibit={ setExibitProducts } funcCarrinho={ setArrCar } />
        : <Checkout carrinho={ arrCar } />}
    </div>
  );
}

export default Custumer;
