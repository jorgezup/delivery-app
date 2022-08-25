import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const [customerName, setCustomerName] = useState('');
  const history = useHistory();

  useEffect(() => {
    const localData = localStorage.getItem('userInfos');
    const objUser = JSON.parse(localData);
    setCustomerName(objUser.name);
  }, []);

  return (
    <nav>
      <div>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        />
        <Link
          to="/customer/checkout"
          data-testid="customer_products__element-navbar-link-orders"
        />
      </div>
      <div>
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {customerName}
        </p>
        <button
          type="button"
          onClick={ () => history.push('/login') }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>

    </nav>
  );
}

export default Header;
