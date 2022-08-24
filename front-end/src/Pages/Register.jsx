import React from 'react';

function Register() {
  return (
    <div className='register-page'>
      <main className='register-main'>
        <form className='register-form'>
          <input
            id='name'
            type="text"
            placeholder="Nome"
            className="register-input"
            required
            // value={ name }
            // onChange={ (e) => setEmail(e.target.value) }
          />
          <input
            id='email'
            type="text"
            placeholder="Email"
            className="register-input"
            required
            // value={ email }
            // onChange={ (e) => setEmail(e.target.value) }
          />
          <input
            id='password'
            type="password"
            placeholder="Senha"
            className="register-input"
            required
            // value={ password }
            // onChange={ (e) => setPassword(e.target.value) }
          />
          <button
            type="button"
            className='register-button'
            // onClick={ handleLogin }
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

export default Register;