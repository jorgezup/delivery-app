import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../API_Calls/api';

function OrdersGeneric() {
  const [orders, setOrders] = useState([]);
  const [pInfo, setPInfo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const userStorage = JSON.parse(localStorage.getItem('user'));
  const { token } = userStorage;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await api.get('/seller/orders', {
          headers: { Authorization: token },
        });
        setOrders(data);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setPInfo(e.message.statusText);
      }
    };
    getOrders();
  }, [token]);
  return (
    <>
      <h3>Orders</h3>
      {isLoading && <h1>Loading</h1>}
      {pInfo && <h1 style={ { color: 'red' } }>{pInfo}</h1>}
      <div className="container">
        {
          orders.map((order) => (
            <Link key={ order.id } to={ `/seller/orders/${order.id}` }>
              <div
                className="card"
                style={ { border: '1px solid black', marginBottom: '20px' } }
              >
                <div className="grid">
                  <div className="orderNumber">
                    <p
                      data-testid={ `seller_orders__element-order-id-${order.id}` }
                    >
                      {`Pedido ${order.id}`}
                    </p>
                  </div>
                  <div className="orderDetails">
                    <div
                      className="status"
                      data-testid={ `
                      seller_orders__element-delivery-status-${order.status}
                    ` }
                    >
                      {order.status}
                    </div>
                    <p
                      data-testid={ `
                        seller_orders__element-order-date-${order.saleDate}` }
                    >
                      {order.saleDate}
                    </p>
                    <p
                      data-testid={ `
                        seller_orders__element-card-price-${order.totalPrice}
                      ` }
                    >
                      {order.totalPrice}
                    </p>
                    <div
                      className="address"
                      data-testid={ `
                      seller_orders__element-card-address-${order.deliveryAddress}
                    ` }
                    >
                      {`${order.deliveryAddress}, ${order.deliveryNumber}`}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </>
  );
}

export default OrdersGeneric;
