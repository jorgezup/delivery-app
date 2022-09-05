import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import listOrders from '../API_Calls/getOrderDetails';
import Header from '../Components/Header';
import OrderDetailsTopInfos from '../Components/OrderDetailsTopInfos';
// import api from '../API_Calls/api';
import updateStatus from '../API_Calls/updateStatus';

function OrderCustumerDetails() {
  const [order, setOrder] = useState({});
  const [boughtProducts, setBoughtProducts] = useState([]);
  const [orderId, setOrderId] = useState(0);
  const [token, setToken] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const history = useHistory();

  const dataTestId = 'customer_order_details__';

  useEffect(() => {
    const localData = localStorage.getItem('user');
    const objUser = JSON.parse(localData);

    const getOrderId = history.location.pathname.split('/');
    setOrderId(+getOrderId[3]);
    setToken(objUser.token);

    const getDetails = async () => {
      const result = await listOrders(getOrderId[3], objUser.token);
      setBoughtProducts(result.products);

      const objOrder = {
        id: result.id,
        seller: result.sales.name,
        status: result.status,
        totalPrice: +result.totalPrice,
        date: result.saleDate,
      };
      setOrder(objOrder);
      if (result.status === 'Em Trânsito') {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    };
    getDetails();
  }, [order]);

  const handleChangeStatusToDelivered = async () => {
    const objBody = { status: 'Entregue', id: orderId };
    await updateStatus(token, objBody);
  };

  return (
    <div>
      <Header />
      <h3>Detalhes do Pedido</h3>
      <OrderDetailsTopInfos
        order={ order }
        handleChangeStatusToDelivered={ handleChangeStatusToDelivered }
        buttonDisabled={ buttonDisabled }
      />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {boughtProducts.map((item, index) => (
            <tr key={ item.id }>
              <td
                data-testid={
                  `${dataTestId}element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-name-${index}`
                }
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-quantity-${index}`
                }
              >
                {item.saleProduct.quantity}

              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-unit-price-${index}`
                }
              >
                {item.price.replace(/\./, ',')}

              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-sub-total-${index}`
                }
              >
                {
                  (+item.saleProduct.quantity * +item.price)
                    ?.toFixed(2).toString().replace(/\./, ',')
                }

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid={ `${dataTestId}element-order-total-price` }
      >
        {`Valor total: R$${order.totalPrice?.toFixed(2).toString().replace(/\./, ',')}`}
      </p>
    </div>
  );
}

export default OrderCustumerDetails;
