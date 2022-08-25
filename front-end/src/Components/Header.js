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
        <Link to="/customer/products" />
        <Link to="/customer/checkout" />
      </div>
      <div>
        <p>{customerName}</p>
        <button type="button" onClick={ () => history.push('/login') }>Sair</button>
      </div>

    </nav>
  );
}

export default Header;
