import React from "react";
import renderWithRouter from "../renderWithRouter";
import {screen} from "@testing-library/react";
import Admin from "../../Pages/Admin";

const adminUser = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator",
  token: "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsImVtYWlsIjoiYWRtQGRlbGl2ZXJ5YXBwLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIn0.gOLSQNIsvhy3fy5ogmv7xx0Z6RN1i1V_JgBgDdTefoQ"
}

describe('Teste Página Admin', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(adminUser));
    jest.restoreAllMocks();
  });

  afterEach(() => localStorage.clear());
  it('Será validado se o componente Header é renderizado na página /admin/manage',
    async () => {
      renderWithRouter(<Admin/>);
            
      const pUserName = screen.getByTestId("customer_products__element-navbar-user-full-name")

      expect(pUserName).toBeInTheDocument();
      expect(pUserName.textContent).toBe('Delivery App Admin')
    });
});
