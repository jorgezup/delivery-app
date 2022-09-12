import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/formatters';

function OrderDetailsFooterInfos({ order }) {
  const dataTestId = 'customer_order_details__';

  return (
    <div className="footer-infos-general">
      <p data-testid="customer_order_details__element-order-details-label-order-id">
        {`Pedido ${order.id}`}
      </p>
      <p data-testid={ `${dataTestId}element-order-details-label-seller-name` }>
        Pessoa Vendedora:
        {' '}
        {order.seller}
      </p>
      <p data-testid={ `${dataTestId}element-order-details-label-order-date` }>
        {formatDate(order.date)}
      </p>
      <p
        data-testid={ `${dataTestId}element-order-total-price` }
        className="footer-infos-total-price"
      >
        {`Valor total: R$${order.totalPrice?.toFixed(2).toString().replace(/\./, ',')}`}
      </p>
    </div>
  );
}

OrderDetailsFooterInfos.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    seller: PropTypes.string,
    date: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default OrderDetailsFooterInfos;
