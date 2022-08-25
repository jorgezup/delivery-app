import React, { useState } from 'react';
import { useEffect } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /\S+@\S+\.\S+/;
  // const [pInfo, setPInfo] = useState('');
  const [disabled, setDisabled] = useState(true);

  function handleButton() {
    setDisabled(true); setName(''); setEmail(''); setPassword('');
  };

  useEffect(() => {
    if (name.length >= 12 && password.length >= 6 && emailRegex.test(email) ) {
      setDisabled(false);
    } else { setDisabled(true) }
  }, [name, email, password]);

  return (
    <div className='register-page'>
      <main className='register-main'>
        <form className='register-form'>
          <input
            id='name'
            type="text"
            data-testid="common_register__input-name"
            placeholder="Nome"
            className="register-input"
            required
            value={ name }
            onChange={ (e) => setName(e.target.value) }
          />
          <input
            id='email'
            type="text"
            data-testid="common_register__input-email"
            placeholder="Email"
            className="register-input"
            required
            value={ email }
            onChange={ (e) => setEmail(e.target.value) }
          />
          <input
            id='password'
            type="password"
            data-testid="common_register__input-password"
            placeholder="Senha"
            className="register-input"
            required
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
          />
          <button
            type="button"
            data-testid="common_register__button-register"
            className='register-button'
            disabled={ disabled }
            onClick={ handleButton }
          >
            Cadastrar
          </button>
          {/* {pInfo && (
            <p
              className='login-pInfo'
              data-testid="common_register__element-invalid_register"
            >{pInfo}</p>}) */}
        </form>
      </main>
    </div>
  );
}

export default Register;