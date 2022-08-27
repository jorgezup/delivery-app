import React, { useEffect, useState } from 'react';
import api from '../API_Calls/api';
import Button from './Button';

function TableUsers() {
  const [users, setUsers] = useState([]);
  const [pInfo, setPInfo] = useState('');
  const [loading, setLoading] = useState(true);

  const userStorage = JSON.parse(localStorage.getItem('user'));
  const { token } = userStorage;

  const getUsers = () => api.get('admin/manage', {
    headers: { Authorization: token },
  });
  const deleteUser = (id) => api.delete(`admin/manage/${id}`, {
    headers: { Authorization: token },
  });

  useEffect(() => {
    getUsers()
      .then(({ data }) => setUsers(data) && setPInfo('') && setLoading(false))
      .catch(({ response }) => setPInfo(response.statusText));
  });

  return (
    <div>
      <h3>Lista de Usuários</h3>
      {!loading && <h1>Loading</h1>}
      {pInfo && <h1 style={ { color: 'red' } }>{pInfo}</h1>}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={ user.id }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${user.id}` }
              >
                {user.id}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${user.id}` }
              >
                {user.name}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${user.id}` }
              >
                {user.email}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${user.id}` }
              >
                {user.role}
              </td>
              <td
                data-testid={ `admin_manage__element-user-table-remove-${user.id}` }
              >
                <Button
                  type="button"
                  onClick={ () => deleteUser(user.id) }
                  value="Excluir"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableUsers;
