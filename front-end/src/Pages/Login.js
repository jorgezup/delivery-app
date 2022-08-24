import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import userLogin from '../API_Calls/userLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidemail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [disable, setDisable] = useState(true);
  const [redirectPerson, setRedirectPerson] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');

  const textError = (emailTest) => {
    const re = /\S+@\S+\.\S+/; // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    const validation = re.test(emailTest); // referência: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (validation) {
      setValidemail(false);
      setDisable(true);
    } else {
      setValidemail(true);
      setErrorMessage('Email Inválido');
      setDisable(true);
    }
  };

  const passwordError = (pass) => {
    const passLimit = 6;
    if (pass.length < passLimit) {
      setValidemail(true);
      setErrorMessage('Senha Inválida');
      setDisable(true);
    } else {
      setValidemail(false);
      setDisable(false);
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

  const clickRegister = () => {
    setRedirectTo('/register');
    setRedirectPerson(true);
  };

  const clickLogin = async () => {
    const user = {
      email,
      password,
    };
    const userInfos = await userLogin(user);

    if (!userInfos.token) {
      setErrorMessage(userInfos);
    } else if (userInfos.role === 'customer') {
      localStorage.setItem('userInfos', userInfos);
      setRedirectTo('/customer/products');
      setRedirectPerson(true);
    } else if (userInfos.role === 'seller') {
      localStorage.setItem('userInfos', userInfos);
      setRedirectTo('/seller/orders');
      setRedirectPerson(true);
    } else if (userInfos.role === 'admin') {
      localStorage.setItem('userInfos', userInfos);
      setRedirectTo('/admin/manage');
      setRedirectPerson(true);
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
            onClick={ clickRegister }
          >
            Ainda não é cadastrado?
          </button>
        </form>
        {validEmail && <p>{errorMessage}</p> }
        {redirectPerson && <Redirect to={ redirectTo } /> }
      </main>
    </div>
  );
}

export default Login;
