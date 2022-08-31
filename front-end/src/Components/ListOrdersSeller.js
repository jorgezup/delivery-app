import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../API_Calls/api';
import { formatDate, formatPrice } from '../utils/formatters';

function OrdersGeneric() {
  const [orders, setOrders] = useState([]);
  const [pInfo, setPInfo] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const { token } = JSON.parse(localStorage.getItem('user'));

  const dataTestId = 'seller_orders__';

  const history = useHistory();

  const NavigateToOrderDetails = (id) => {
    history.push(`/seller/orders/${id}`);
  };

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
            <button
              type="button"
              key={ order.id }
              onClick={ () => NavigateToOrderDetails(order.id) }
            >
              <div
                className="card"
              >
                <div className="grid">
                  <div className="orderNumber">
                    <p
                      data-testid={ `${dataTestId}element-order-id-${order.id}` }
                    >
                      {`Pedido ${order.id}`}
                    </p>
                  </div>
                  <div className="orderDetails">
                    <div
                      className="status"
                      data-testid={ `
                      ${dataTestId}element-delivery-status-${order.id}
                    ` }
                    >
                      {order.status}
                    </div>
                    <p
                      data-testid={ `
                        ${dataTestId}element-order-date-${order.id}` }
                    >
                      {formatDate(order.saleDate)}
                    </p>
                    <p
                      data-testid={ `
                        ${dataTestId}element-card-price-${order.id}
                      ` }
                    >
                      {formatPrice(order.totalPrice)}
                    </p>
                    <div
                      className="address"
                      data-testid={ `
                      ${dataTestId}element-card-address-${order.id}
                    ` }
                    >
                      {`${order.deliveryAddress}, ${order.deliveryNumber}`}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))
        }
      </div>
    </>
  );
}

export default OrdersGeneric;
