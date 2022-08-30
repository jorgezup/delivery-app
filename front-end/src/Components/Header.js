import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { func } from 'prop-types';

function Header(props) {
  const [customerName, setCustomerName] = useState('');
  const history = useHistory();

  useEffect(() => {
    const localData = localStorage.getItem('user');
    const objUser = JSON.parse(localData);
    setCustomerName(objUser.name);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  const clickLinkProducts = () => {
    const { setExibitProducts } = props;
    setExibitProducts(true);
  };

  const clickLinkCheckout = () => {
    const { setExibitProducts } = props;
    setExibitProducts(false);
  };

  return (
    <nav>
      <div>
        <button type="button" onClick={ clickLinkProducts }>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        </button>

        <button type="button" onClick={ clickLinkCheckout }>
          <Link
            to="/customer/checkout"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Checkout
          </Link>
        </button>

      </div>
      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {customerName}
        </p>
        <button
          type="button"
          onClick={ logout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>

    </nav>
  );
}

Header.propTypes = {
  setExibitProducts: func.isRequired,
};

export default Header;
