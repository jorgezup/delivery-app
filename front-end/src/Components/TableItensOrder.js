import PropTypes from 'prop-types';

function TableItensOrder({ products }) {
  return (
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
        {
          products?.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={ `
                seller_order_details__element-order-table-item-number-${index + 1}` }
                className="table-products-itens"
              >
                {index + 1}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-name-${product.name}` }
                className="table-products-description"
              >
                {product.name}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-quantity-${
            product.saleProduct.quantity} ` }
                className="table-products-quantity"
              >
                {product.saleProduct.quantity}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-unit-price-${product.price}` }
                className="table-products-unit-price"
              >
                {product.price.toString().replace(/\./, ',')}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-sub-total-${
            product.price * product.saleProduct.quantity}` }
                className="table-products-sub-total"
              >
                R$
                {' '}
                {
                  (product.price * product.saleProduct.quantity)
                    .toFixed(2).replace(/\./, ',')
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

TableItensOrder.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    saleProduct: PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }).isRequired,
  })),
}.isRequired;

export default TableItensOrder;
