import React from "react";
import renderWithRouter from "../renderWithRouter";
import {screen} from "@testing-library/react";
import Seller from "../../Pages/Seller";

const sellerUser = {
  id: 2,
  name: "Fulana Pereira",
  email: "fulana@deliveryapp.com",
  role: "seller",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIn0.gOLSQNIsvhy3fy5ogmv7xx0Z6RN1i1V_JgBgDdTefoQ"
}

describe('Teste Página Seller', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(sellerUser));
    jest.restoreAllMocks();
  });

  afterEach(() => localStorage.clear());
  it('Será validado se o componente Header é renderizado na página /customer/products',
    async () => {
      renderWithRouter(<Seller/>);

      const pUserName = screen.getByTestId("customer_products__element-navbar-user-full-name")

      expect(pUserName).toBeInTheDocument();
      expect(pUserName.textContent).toBe(sellerUser.name)
    });
  
  // it('Será validado se é possível clicar em um Pedido', () => {
  //   renderWithRouter(<Seller/>);
  //  
  //   const order = screen.getByRole('button')
  //
  //   fireEvent.click(order)
  //  
  //   expect(order).toBeInTheDocument()
  // })
});
