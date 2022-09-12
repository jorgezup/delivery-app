import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import validate from '../Validations/validateRegister';
import postRegister from '../API_Calls/register';
import '../Styles/Register.css';
import logo from '../images/logo.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /\S+@\S+\.\S+/;
  const [pInfo, setPInfo] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  async function handleButton() {
    try {
      await postRegister(name, email, password);
      history.push('/customer/products');
    } catch (error) {
      setPInfo(error.response.data.message);
    }
  }

  useEffect(() => {
    const minLengthName = 12;
    const minLengthPassword = 6;

    if (name.length >= minLengthName
      && password.length >= minLengthPassword && emailRegex.test(email)) {
      setDisabled(false); setPInfo('');
    } else if (!name || !password || !email) {
      setPInfo('');
    } else { setDisabled(true); setPInfo(validate(name, email, password)); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password]);

  return (
    <div className="register-page">
      <main className="register-main">
        <div className="logo">
          <img src={ logo } alt="Logo" />
          <h1>
            Beer
            <span>Pong</span>
          </h1>
        </div>
        <form className="register-form">
          <label
            htmlFor="name"
            className="txt_field"
          >
            <span>Nome</span>
            <input
              id="name"
              type="text"
              data-testid="common_register__input-name"
              placeholder="Nome"
              className="register-input"
              required
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </label>
          <label
            htmlFor="email"
            className="txt_field"
          >
            <span>Email</span>
            <input
              id="email"
              type="text"
              data-testid="common_register__input-email"
              placeholder="Email"
              className="register-input"
              required
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>

          <label
            htmlFor="password"
            className="txt_field"
          >
            <span>Senha</span>
            <input
              id="password"
              type="password"
              data-testid="common_register__input-password"
              placeholder="Senha"
              className="register-input"
              required
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>

          <button
            type="button"
            data-testid="common_register__button-register"
            className="register-button"
            disabled={ disabled }
            onClick={ handleButton }
          >
            Cadastrar
          </button>
          {pInfo && (
            <p
              className="register-pInfo"
              data-testid="common_register__element-invalid_register"
            >
              {pInfo}

            </p>)}
        </form>
      </main>
    </div>
  );
}

export default Register;
