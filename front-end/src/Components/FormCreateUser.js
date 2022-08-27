import React, { useCallback, useState } from 'react';
import { string, func, bool } from 'prop-types';
import Input from './Input';
import Button from './Button';
import api from '../API_Calls/api';

const roles = [
  {
    id: 0,
    role: 'seller',
    displayName: 'Vendedor',
  },
  {
    id: 1,
    role: 'customer',
    displayName: 'Cliente',
  },
];

const MIN_LENGTH_NAME = 12;
const MIN_LENGTH_PASSWORD = 6;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function FormCreateUser() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(roles[0].role);
  const [pInfo, setPInfo] = useState('');

  const isValid = useCallback(() => {
    const validateName = fullName.length >= MIN_LENGTH_NAME;
    const validateEmail = EMAIL_REGEX.test(email);
    const validatePassword = password.length >= MIN_LENGTH_PASSWORD;
    return validateName && validateEmail && validatePassword;
  }, [email, fullName, password]);

  const handleChangeFullName = (event) => setFullName(event.target.value);
  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangeRole = (event) => setRole(event.target.value);

  const clearInputFields = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setRole(roles[0].role);
    setPInfo('');
  };

  const userStorage = JSON.parse(localStorage.getItem('user'));
  const { token } = userStorage;

  const createUser = () => api.post('/admin/manage', {
    name: fullName, email, password, role,
  }, { headers: { Authorization: token } });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser();
      clearInputFields();
    } catch (error) {
      setPInfo(error.response.data.message);
    }
  };
  return (
    <div>
      <h3>Cadastrar Novo Usuário</h3>
      <p
        data-testid="admin_manage__element-invalid-register"
        style={ { color: 'red' } }
      >
        {pInfo}
      </p>
      <form onSubmit={ handleSubmit }>
        <Input
          type="text"
          label="Nome"
          value={ fullName }
          name="name"
          onChange={ handleChangeFullName }
          data-testid="admin_manage__input-name"
        />
        <Input
          type="text"
          label="Email"
          value={ email }
          name="email"
          onChange={ handleChangeEmail }
          data-testid="admin_manage__input-email"
        />
        <Input
          type="password"
          label="Senha"
          value={ password }
          name="password"
          onChange={ handleChangePassword }
          data-testid="admin_manage__input-password"
        />
        <select
          name="roles"
          id="roles"
          data-testid="admin_manage__select-role"
          onChange={ handleChangeRole }
        >
          {
            roles.map((item) => (
              <option
                value={ item.role }
                key={ item.id }
                defaultValue={ roles[0].name }
              >
                {item.displayName}
              </option>
            ))
          }
        </select>
        <Button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ !isValid() }
          value="Cadastrar"
        />

      </form>
    </div>
  );
}
FormCreateUser.propTypes = {
  name: string,
  email: string,
  password: string,
  isBtnDisabled: bool,
  handleChange: func,
  handleSubmit: func,
}.isRequired;

export default FormCreateUser;
