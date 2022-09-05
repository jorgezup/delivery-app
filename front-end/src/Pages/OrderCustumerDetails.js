import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import listOrders from '../API_Calls/getOrderDetails';
import Header from '../Components/Header';
import OrderDetailsTopInfos from '../Components/OrderDetailsTopInfos';

function OrderCustumerDetails() {
  const [order, setOrder] = useState({});
  const [boughtProducts, setBoughtProducts] = useState([]);
  const history = useHistory();

  const dataTestId = 'customer_order_details__';

  useEffect(() => {
    // const localId = localStorage.getItem('userId');
    const localData = localStorage.getItem('user');
    const objUser = JSON.parse(localData);

    const getOrderId = history.location.pathname.split('/');

    const getDetails = async () => {
      const result = await listOrders(getOrderId[3], objUser.token);
      console.log(result);
      setBoughtProducts(result.products);
      const objOrder = {
        id: result.id,
        seller: result.sales.name,
        status: result.status,
        totalPrice: +result.totalPrice,
        date: result.saleDate,
      };
      setOrder(objOrder);
    };
    getDetails();
  }, []);

  return (
    <div>
      <Header />
      <h3>Detalhes do Pedido</h3>
      <OrderDetailsTopInfos order={ order } />
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
