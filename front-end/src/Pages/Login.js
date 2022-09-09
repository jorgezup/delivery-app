import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import userLogin from '../API_Calls/userLogin';
// import { MyContext } from '../Context/Provider';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidemail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [disable, setDisable] = useState(true);
  // const setUserId = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const { token, role } = JSON.parse(userLocalStorage);

      if (token) {
        if (role === 'customer') {
          history.push('/customer/products');
        } else if (role === 'seller') {
          history.push('/seller/orders');
        } else if (role === 'administrator') {
          history.push('/admin/manage');
        }
      }
    }
  });

  const textError = (emailTest) => {
    const re = /\S+@\S+\.\S+/; // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validation = re.test(emailTest); // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (validation) {
      setValidemail(false);
      setDisable(true);
    } else {
      setValidemail(true);
      setErrorMessage('Dados Inválidos');
      setDisable(true);
    }
  };

  const passwordError = (pass) => {
    const passLimit = 6;

    if (pass.length < passLimit) {
      setValidPassword(true);
      setErrorMessage('Dados Inválidos');
      setDisable(true);
    } else {
      setValidPassword(false);
      if (!validEmail) {
        setDisable(false);
      } else {
        setDisable(true);
      }
    }
  };

  const manageInputs = ({ target }) => {
    const { value, id } = target;

    if (id === 'email-input') {
      setEmail(value);
      textError(value);
    } else {
      setPassword(value);
      passwordError(value);
    }
  };

  const clickLogin = async () => {
    const user = {
      email,
      password,
    };
    const userInfos = await userLogin(user);

    if (!userInfos.token) {
      setValidemail(true);
      setErrorMessage(userInfos);
    } else if (userInfos.role === 'customer') {
      const objLocal = {
        name: userInfos.name,
        role: userInfos.role,
        token: userInfos.token,
        email,
      };
      const stringLocal = JSON.stringify(objLocal);
      const stringLocalId = JSON.stringify(userInfos.id);
      // setUserId(userInfos.id);
      localStorage.setItem('user', stringLocal);
      localStorage.setItem('userId', stringLocalId);
      history.push('/customer/products');
    } else if (userInfos.role === 'seller') {
      const objLocal = {
        name: userInfos.name,
        role: userInfos.role,
        token: userInfos.token,
        email,
      };
      const stringLocal = JSON.stringify(objLocal);
      const stringLocalId = JSON.stringify(userInfos.id);
      // setUserId(userInfos.id);
      localStorage.setItem('user', stringLocal);
      localStorage.setItem('userId', stringLocalId);
      history.push('/seller/orders');
    } else if (userInfos.role === 'administrator') {
      const objLocal = {
        name: userInfos.name,
        role: userInfos.role,
        token: userInfos.token,
        email,
      };
      const stringLocal = JSON.stringify(objLocal);
      const stringLocalId = JSON.stringify(userInfos.id);
      // setUserId(userInfos.id);
      localStorage.setItem('user', stringLocal);
      localStorage.setItem('userId', stringLocalId);
      history.push('/admin/manage');
    }
  };

  return (
    <div>
      <h1> Aprovados App </h1>
      <main>
        <form>
          <label htmlFor="email-input">
            <input
              type="email"
              id="email-input"
              placeholder="Digite seu e-mail"
              data-testid="common_login__input-email"
              value={ email }
              onChange={ manageInputs }
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              id="password-input"
              placeholder="Digite sua senha"
              data-testid="common_login__input-password"
              value={ password }
              onChange={ manageInputs }
            />
          </label>
          {}
          <button
            type="button"
            data-testid="common_login__button-login"
            disabled={ disable }
            onClick={ clickLogin }
          >
            Entrar
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/register') }
          >
            Ainda não é cadastrado?
          </button>
        </form>
        {validEmail
        && <p data-testid="common_login__element-invalid-email">{errorMessage}</p> }
        {validPassword
        && <p data-testid="common_login__element-invalid-email">{errorMessage}</p> }
      </main>
    </div>
  );
}

export default Login;
