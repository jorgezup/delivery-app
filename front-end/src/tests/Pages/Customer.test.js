import React from "react";
import renderWithRouter from "../renderWithRouter";
import {screen} from "@testing-library/react";
import Seller from "../../Pages/Seller";

const customerUser = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIn0.gOLSQNIsvhy3fy5ogmv7xx0Z6RN1i1V_JgBgDdTefoQ"
}

describe('Teste Página Customer', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(customerUser));
    jest.restoreAllMocks();
  });

  afterEach(() => localStorage.clear());
  it('Será validado se o componente Header é renderizado na página /customer/products',
    async () => {
      renderWithRouter(<Seller/>);

      const pUserName = screen.getByTestId("customer_products__element-navbar-user-full-name")

      expect(pUserName).toBeInTheDocument();
      expect(pUserName.textContent).toBe(customerUser.name)
    });
});
