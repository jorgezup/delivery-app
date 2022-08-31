import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
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

  return (
    <nav>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>

        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Orders
        </Link>

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

export default Header;
