import React from 'react';

function Login() {
  return (
    <div>
      <h1> Aprovados </h1>
      <main>
        <form>
          <label htmlFor="email-input">
            <input
              type="email"
              id="email-input"
              placeholder="Digite seu e-mail"
              data-testid="common_login__input-email"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              id="password-input"
              placeholder="Digite sua senha"
              data-testid="common_login__input-password"
            />
          </label>
          <button type="button" data-testid="common_login__button-login">Entrar</button>
          <button
            type="button"
            data-testid="common_login__button-register"
          >
            Ainda não é cadastrado?
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
