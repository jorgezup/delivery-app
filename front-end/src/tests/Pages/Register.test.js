import React from "react";
import renderWithRouter from "../renderWithRouter";
import Register from "../../Pages/Register";

describe('Teste Da Página de Register', () => {
  test('Verifica se a página contém um formulário', () => {
    const { getByRole } = renderWithRouter(<Register />);

    const main = getByRole('main');

    expect(main.firstChild).toHaveClass('register-form');
  });

  test('Verifica se a página contém um input de Nome com placeholder', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Register />);

    const inputNome = getByTestId('common_register__input-name');
    const inputNomePlaceHolder = getByPlaceholderText('Nome')

    expect(inputNome).toBeInTheDocument();
    expect(inputNomePlaceHolder).toBeInTheDocument();
  });

  test('Verifica se a página contém um input de email com placeholder', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Register />);

    const inputEmail = getByTestId('common_register__input-email');
    const inputEmailPlaceHolder = getByPlaceholderText('Email')

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmailPlaceHolder).toBeInTheDocument();
  });

  test('Verifica se a página contém um input de password com placeholder', () => {
    const { getByTestId, getByPlaceholderText } = renderWithRouter(<Register />);

    const inputPassword = getByTestId('common_register__input-password');
    const inputPasswordPlaceHolder = getByPlaceholderText('Senha')

    expect(inputPassword).toBeInTheDocument();
    expect(inputPasswordPlaceHolder).toBeInTheDocument();
  });

  test('Verifica se a página contém um botão de Cadastrar', () => {
    const { getByTestId } = renderWithRouter(<Register />);

    const buttonRegister = getByTestId('common_register__button-register');

    expect(buttonRegister).toBeInTheDocument();
    expect(buttonRegister.textContent).toEqual('Cadastrar')
  });

});
