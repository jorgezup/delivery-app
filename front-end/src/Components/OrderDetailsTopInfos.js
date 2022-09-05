import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../utils/formatters';

function OrderDetailsTopInfos({ order, handleChangeStatusToDelivered, buttonDisabled }) {
  const dataTestId = 'customer_order_details__';

  return (
    <div>
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
      <div
        data-testid={ `${dataTestId}element-order-details-label-delivery-status` }
      >
        {order.status}
      </div>
      <button
        type="button"
        data-testid={ `${dataTestId}button-delivery-check` }
        onClick={ handleChangeStatusToDelivered }
        disabled={ buttonDisabled }
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

OrderDetailsTopInfos.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    seller: PropTypes.string,
    date: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  handleChangeStatusToDelivered: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
};

export default OrderDetailsTopInfos;
