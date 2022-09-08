import React from "react";
import renderWithRouter from "../renderWithRouter";
import App from "../../App";
import userEvent from '@testing-library/user-event';
import {waitFor} from "@testing-library/react";

const customer = {
  email: "zebirita@email.com",
  password: "$#zebirita#$"
}

describe('Teste Componente Header', () => {
  test('Verifica se o componente contém o nome do Usuário logado', async() => {
    const {getByTestId} = renderWithRouter(<App/>);
    
    const inputEmail = getByTestId('common_login__input-email')
    const inputPassword = getByTestId('common_login__input-password')
    const btnLogin = getByTestId('common_login__button-login')

    userEvent.type(inputEmail, customer.email)
    userEvent.type(inputPassword, customer.password)
    userEvent.click(btnLogin)

    await waitFor(() => {
      const loggedUser = getByTestId('customer_products__element-navbar-user-full-name')
      expect(loggedUser.textContent).toEqual('Cliente Zé Birita')
    });

  });
});
