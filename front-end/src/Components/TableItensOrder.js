import PropTypes from 'prop-types';

function TableItensOrder({ products }) {
  return (
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
        {
          products?.map((product, index) => (
            <tr key={ index }>
              <td
                data-testid={ `
                seller_order_details__element-order-table-item-number-${index + 1}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-name-${product.name}` }
              >
                {product.name}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-quantity-${
            product.saleProduct.quantity} ` }
              >
                {product.saleProduct.quantity}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-unit-price-${product.price}` }
              >
                {product.price.toString().replace(/\./, ',')}
              </td>
              <td
                data-testid={ `
                seller_order_details__element-order-table-sub-total-${
            product.price * product.saleProduct.quantity}` }
              >
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
