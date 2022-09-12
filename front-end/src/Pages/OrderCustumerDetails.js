import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import listOrders from '../API_Calls/getOrderDetails';
import Header from '../Components/Header';
import OrderDetailsTopInfos from '../Components/OrderDetailsTopInfos';
// import api from '../API_Calls/api';
import updateStatus from '../API_Calls/updateStatus';
import '../Styles/OrderDetails.css';
import OrderDetailsFooterInfos from '../Components/OrderDetailsFooterInfos';

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
    <div className="general">
      <Header />
      <OrderDetailsTopInfos
        order={ order }
        handleChangeStatusToDelivered={ handleChangeStatusToDelivered }
        buttonDisabled={ buttonDisabled }
      />
      <h3 className="title-table">Detalhes do Pedido</h3>
      <table className="table-products-general">
        <thead>
          <tr>
            <th className="table-products-title">Item</th>
            <th className="table-products-title">Descrição</th>
            <th className="table-products-title">Quantidade</th>
            <th className="table-products-title">Valor Unitário</th>
            <th className="table-products-title">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {boughtProducts.map((item, index) => (
            <tr key={ item.id }>
              <td
                data-testid={
                  `${dataTestId}element-order-table-item-number-${index}`
                }
                className="table-products-itens"
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-name-${index}`
                }
                className="table-products-description"
              >
                {item.name}
              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-quantity-${index}`
                }
                className="table-products-quantity"
              >
                {item.saleProduct.quantity}

              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-unit-price-${index}`
                }
                className="table-products-unit-price"
              >
                {item.price.replace(/\./, ',')}

              </td>
              <td
                data-testid={
                  `${dataTestId}element-order-table-sub-total-${index}`
                }
                className="table-products-sub-total"
              >
                R$
                {' '}
                {
                  (+item.saleProduct.quantity * +item.price)
                    ?.toFixed(2).toString().replace(/\./, ',')
                }

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OrderDetailsFooterInfos order={ order } />
    </div>
  );
}

export default OrderCustumerDetails;
