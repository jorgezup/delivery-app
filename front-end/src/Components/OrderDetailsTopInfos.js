import React from 'react';
import PropTypes from 'prop-types';

function OrderDetailsTopInfos({ order, handleChangeStatusToDelivered, buttonDisabled }) {
  const dataTestId = 'customer_order_details__';

  return (
    <div className="top-infos-general">
      <div
        data-testid={ `${dataTestId}element-order-details-label-delivery-status` }
        className="top-infos-status"
      >
        {order.status}
      </div>
      <button
        type="button"
        data-testid={ `${dataTestId}button-delivery-check` }
        onClick={ handleChangeStatusToDelivered }
        disabled={ buttonDisabled }
        className="top-infos-button-delivered"
      >
        Marcar Como Entregue
      </button>
    </div>
  );
}

OrderDetailsTopInfos.propTypes = {
  order: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  handleChangeStatusToDelivered: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
};

export default OrderDetailsTopInfos;
