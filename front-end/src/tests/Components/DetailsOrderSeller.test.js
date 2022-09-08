import React from "react";
import renderWithRouter from "../renderWithRouter";
import {screen} from "@testing-library/react";
import DetailsOrderSeller from "../../Components/DetailsOrderSeller";
import order from '../mock/sellerOrders'

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
  it('Será validado se a página de detalhes do Pedido é exibida',
    async () => {
      renderWithRouter(<DetailsOrderSeller sale={order}/>);

      const h3Detalhes = screen.getByRole('heading', {name: 'Detalhes do Pedido', level: 3})

      expect(h3Detalhes).toBeInTheDocument();
    });
  
});
