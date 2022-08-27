import React from 'react';
import Header from '../Components/Header';
import TableUsers from '../Components/TableUsers';
import FormCreateUser from '../Components/FormCreateUser';

function Admin() {
  return (
    <div>
      <h1>Administrador</h1>
      <Header />
      <FormCreateUser />
      <TableUsers />
    </div>
  );
}

export default Admin;
