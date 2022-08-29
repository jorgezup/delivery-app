import React, { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { useHistory } from 'react-router-dom';
import listProducts from '../API_Calls/listProducts';

function TableProducts(props) {
  const [arrProducts, setArrProducts] = useState([]);
  const [totalPrice, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const { funcExibit } = props;
    funcExibit(true);
    const localData = localStorage.getItem('user');
    const objUser = JSON.parse(localData);

    const getProduts = async () => {
      const list = await listProducts(objUser.token);
      const list2 = list.map((itemList) => ({
        ...itemList,
        qtd: 0,
      }));
      setArrProducts(list2);
    };
    getProduts();
  }, [props]);

  const changeInput = ({ target }) => {
    const { value, id } = target;

    const item2 = arrProducts.map((product) => {
      if (Number(id) === product.id && Number(value) > 0) {
        return {
          ...product,
          qtd: Number(value),
        };
      }
      return product;
    });
    setArrProducts(item2);

    const allPrice = item2.reduce((acc, item) => {
      acc += (item.price * item.qtd);
      return acc;
    }, 0);
    setTotal(allPrice.toFixed(2));
  };

  const addValue = (id) => {
    // const item = arrProducts.find((product) => Number(id) === product.id);
    const item2 = arrProducts.map((product) => {
      if (Number(id) === product.id) {
        return {
          ...product,
          qtd: product.qtd + 1,
        };
      }
      return product;
    });
    setArrProducts(item2);

    const allPrice = item2.reduce((acc, item) => {
      acc += (item.price * item.qtd);
      return acc;
    }, 0);
    setTotal(allPrice.toFixed(2));
  };

  const rmValue = (id) => {
    const item2 = arrProducts.map((product) => {
      if (Number(id) === product.id && product.qtd > 0) {
        return {
          ...product,
          qtd: product.qtd - 1,
        };
      }
      return product;
    });
    setArrProducts(item2);

    const allPrice = item2.reduce((acc, item) => {
      acc += (item.price * item.qtd);
      return acc;
    }, 0);
    setTotal(allPrice.toFixed(2));
  };

  const clickCart = () => {
    const { funcCarrinho, funcExibit } = props;
    const carrinho = arrProducts.filter((product) => product.qtd > 0);
    funcCarrinho(carrinho);
    funcExibit(false);
    history.push('/customer/checkout');
    // localStorage.setItem('carrinho', carrinho);
  };

  return (
    <div>
      {arrProducts.map((items) => (
        <div key={ items.id }>
          <img
            src={ items.urlImage }
            alt="imagem de cerveja"
            data-testid={ `customer_products__img-card-bg-image-${items.id}` }
          />
          <p
            data-testid={ `customer_products__element-card-title-${items.id}` }
          >
            {items.name}
          </p>
          <p
            data-testid={ `customer_products__element-card-price-${items.id}` }
          >
            {items.price.replace(/\./, ',')}
          </p>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${items.id}` }
            onClick={ () => rmValue(items.id) }
            id={ items.id }
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={ items.qtd }
            data-testid={ `customer_products__input-card-quantity-${items.id}` }
            onChange={ changeInput }
            id={ items.id }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${items.id}` }
            onClick={ () => addValue(items.id) }
            id={ items.id }
          >
            +
          </button>
        </div>
      ))}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ clickCart }
        disabled={ totalPrice === 0 || totalPrice === '0.00' }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          {`Valor total: R$${totalPrice.toString().replace(/\./, ',')}`}
        </p>
      </button>
    </div>
  );
}

TableProducts.propTypes = {
  funcCarrinho: func.isRequired,
  funcExibit: func.isRequired,
};

export default TableProducts;
