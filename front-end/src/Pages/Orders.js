import React from 'react';
import Header from '../Components/Header';
import TableOrders from '../Components/TableOrders';

function Orders() {
  return (
    <div>
      <Header />
      <h1>Meus pedidos</h1>
      <TableOrders />
    </div>
  );
}

export default Orders;
