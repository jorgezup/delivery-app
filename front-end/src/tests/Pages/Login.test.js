import React from "react";
import renderWithRouter from "../renderWithRouter";
import Login from "../../Pages/Login";

describe('Teste Da Página de Login', () => {
  test('Verifica se a página contém um h2 com o texto "Aprovados App"', () => {
    const { getByRole } = renderWithRouter(<Login />);

    const loginTitle = getByRole('heading', { name: 'Aprovados App', level: 1 });

    expect(loginTitle).toBeInTheDocument();
  });

  test('Verifica se a página contém um input de email com placeholder', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Login />);
  
    const inputEmail = getByTestId('common_login__input-email');
    const inputEmailPlaceHolder = getByPlaceholderText('Digite seu e-mail')

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmailPlaceHolder).toBeInTheDocument();
  });

  test('Verifica se a página contém um input de password com placeholder', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Login />);

    const inputPassword = getByTestId('common_login__input-password');
    const inputPasswordPlaceHolder = getByPlaceholderText('Digite sua senha')

    expect(inputPassword).toBeInTheDocument();
    expect(inputPasswordPlaceHolder).toBeInTheDocument();
  });

  test('Verifica se a página contém um botão de Entrar', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const buttonLogin = getByTestId('common_login__button-login');

    expect(buttonLogin).toBeInTheDocument();
    expect(buttonLogin.textContent).toEqual('Entrar')
  });

  test('Verifica se a página contém um botão de Registrar', () => {
    const { getByTestId } = renderWithRouter(<Login />);

    const buttonRegister = getByTestId('common_login__button-register');

    expect(buttonRegister).toBeInTheDocument();
    expect(buttonRegister.textContent).toEqual('Ainda não é cadastrado?')
  });
});
