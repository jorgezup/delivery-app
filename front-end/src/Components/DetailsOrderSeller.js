import PropTypes from 'prop-types';
import Button from './Button';
import TableItensOrder from './TableItensOrder';
import { formatDate, formatPrice } from '../utils/formatters';

function DetailsOrderSeller({
  sale,
  handleChangeStatusToPreparing,
  handleChangeStatusToDispatch,
}) {
  const { products } = sale;

  const dataTestId = 'seller_order_details__';

  return (
    <div className="container">
      {!sale && <h3>Carregando</h3>}
      <div className="top-infos-general">
        <div
          data-testid={ `${dataTestId}element-order-details-label-delivery-status` }
          className="top-infos-status"
        >
          {sale.status}
        </div>
        <Button
          data-testid={ `${dataTestId}button-preparing-check` }
          type="button"
          value="Preparar Pedido"
          disabled={ sale.status !== 'Pendente' }
          onClick={ handleChangeStatusToPreparing }
          className="top-infos-button-delivered"
        />
        <Button
          data-testid={ `${dataTestId}button-dispatch-check` }
          type="button"
          value="Saiu para entrega"
          disabled={ sale.status !== 'Preparando' }
          onClick={ handleChangeStatusToDispatch }
          className="top-infos-button-delivered"
        />
      </div>
      <h3 className="title-table">Detalhes do Pedido</h3>
      <TableItensOrder products={ products } />
      <div className="row footer-infos-general-seller">
        <div
          data-testid={ `${dataTestId}element-order-details-label-order-id` }
        >
          {`Pedido ${sale.id}`}
        </div>
        <div
          data-testid={ `${dataTestId}element-order-details-label-order-date` }
        >
          {formatDate(sale.saleDate)}
        </div>
        <div className="footer-infos-total-price">
          <span
            data-testid={ `${dataTestId}element-order-total-price` }
          >
            {`Valor Total: R$ ${formatPrice(sale.totalPrice)}`}
          </span>
        </div>
      </div>
    </div>
  );
}

DetailsOrderSeller.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    saleDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      saleProduct: PropTypes.shape({
        quantity: PropTypes.number.isRequired,
      }).isRequired,
    })),
  }),
}.isRequired;

export default DetailsOrderSeller;
