import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Styles/Header.css';

function Header() {
  const [customerName, setCustomerName] = useState('');
  const [role, setRole] = useState('');
  const history = useHistory();

  useEffect(() => {
    const localData = localStorage.getItem('user');
    const objUser = JSON.parse(localData);
    setCustomerName(objUser.name);
    setRole(objUser.role);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <nav className="header-geral">
      <div className="header-geral">
        <div className="background-title">
          <h3 className="space-names title">
            BeerPong
          </h3>
        </div>

        <div className="header-geral">
          <span className="material-icons products-icon">sports_bar</span>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
            className="space-names products-name"
          >
            Produtos
          </Link>

          {role === 'customer'
            ? (
              <div className="header-geral">
                <span className="material-icons">
                  list_alt
                </span>
                <Link
                  to="/customer/orders"
                  data-testid="customer_products__element-navbar-link-orders"
                  className="space-names orders-name"
                >
                  Pedidos
                </Link>
              </div>
            )
            : (
              <div className="header-geral">
                <span className="material-icons">
                  list_alt
                </span>
                <Link
                  to="/seller/orders"
                  data-testid="customer_products__element-navbar-link-orders"
                  className="space-names orders-name"
                >
                  Pedidos
                </Link>
              </div>
            )}
        </div>
      </div>

      <div className="header-geral">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
          className="space-names client-name"
        >
          {customerName}
        </p>
        <button
          type="button"
          onClick={ logout }
          data-testid="customer_products__element-navbar-link-logout"
          className="space-names orders-name button-background"
        >
          <div className="header-geral">
            Sair
            <span className="material-icons">
              logout
            </span>
          </div>

        </button>
      </div>
    </nav>
  );
}

export default Header;
