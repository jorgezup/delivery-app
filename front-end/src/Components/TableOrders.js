import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import customerOrders from '../API_Calls/customerOrders';
import '../Styles/Orders.css';

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
  }, [orders]);

  return (
    <div className="orders-page">
      <h1 className="orders-title">Meus pedidos</h1>
      <div className="orders-list">
        {orders.length > 0 ? (
          orders.map((order) => {
            const date = moment(order.saleDate, 'YYYY-MM-DD');
            const formatedDate = date.format('DD/MM/YYYY');
            const dataTestId = 'customer_orders__element-';
            // className="orders-"
            return (
              <div key={ order.id } className="orders-items">
                <Link
                  to={ `/customer/orders/${order.id}` }
                >
                  <p
                    data-testid={ `${dataTestId}order-id-${order.id}` }
                    className="orders-number"
                  >
                    {`Pedido ${order.id}`}
                  </p>
                  <p
                    data-testid={ `${dataTestId}card-price-${order.id}` }
                    className="orders-price"
                  >
                    {`R$${order.totalPrice.replace('.', ',')}`}
                  </p>
                  <p
                    data-testid={ `${dataTestId}order-date-${order.id}` }
                    className="orders-date"
                  >
                    {formatedDate}
                  </p>
                  <p
                    data-testid={ `${dataTestId}delivery-status-${order.id}` }
                    className="orders-status"
                  >
                    {order.status}
                  </p>
                </Link>
              </div>
            );
          }))
          : (<p className="costume_orders_errorMessage">Sem pedidos</p>)}
      </div>
    </div>
  );
}

export default TableOrders;
