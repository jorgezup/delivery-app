import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import customerOrders from '../API_Calls/customerOrders';

function TableOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const objUser = JSON.parse(localStorage.getItem('user'));
    const userId = JSON.parse(localStorage.getItem('userId'));
    const getCustomerOrders = async () => {
      const data = await customerOrders(objUser.token, userId);
      setOrders(data);
    };
    getCustomerOrders();
  }, []);

  return (
    <div>
      {orders.length > 0 ? (
        orders.map((order) => {
          const date = moment(order.saleDate, 'YYYY-MM-DD');
          const formatedDate = date.format('l');
          const dataTestId = 'customer_orders__element-';
          return (
            <Link key={ order.id } to={ `/customer/orders/${order.id}` }>
              <div>
                <p data-testid={ `${dataTestId}order-id-${order.id}` }>
                  {`Pedido ${order.id}`}
                </p>
              </div>
              <div>
                <p data-testid={ `${dataTestId}delivery-status-${order.id}` }>
                  {order.status}
                </p>
              </div>
              <div>
                <p data-testid={ `${dataTestId}order-date-${order.id}` }>
                  {formatedDate}
                </p>
              </div>
              <div>
                <p data-testid={ `${dataTestId}card-price-${order.id}` }>
                  {`R$${order.totalPrice.replace('.', ',')}`}
                </p>
              </div>
            </Link>
          );
        }))
        : (<p className="costume_orders_errorMessage">Sem pedidos</p>)}
    </div>
  );
}

export default TableOrders;
