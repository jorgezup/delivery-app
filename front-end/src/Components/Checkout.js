import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getSellers from '../API_Calls/getAllSellers';
import { MyDeliveryContext } from '../Context/Provider';
import apiPostSale from '../API_Calls/apiPostSale';

function Checkout(props) {
  const [arrCarrinho, setArrCarrinho] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [adress, setAdress] = useState('');
  const [numberAdress, setNumberAdress] = useState('');
  const [selectValue, setSelectValue] = useState('Fulana Pereira');
  const [arrayOfSellers, setArrayOfSellers] = useState([]);
  const { userId } = useContext(MyDeliveryContext);
  const [token2, setToken2] = useState('');
  const history = useHistory();

  useEffect(() => {
    const { carrinho } = props;
    setArrCarrinho(carrinho);

    const allPrice = carrinho.reduce((acc, item) => {
      acc += (item.price * item.qtd);
      return acc;
    }, 0);

    setTotalPrice(allPrice);

    const userStorage = JSON.parse(localStorage.getItem('user'));
    const { token } = userStorage;
    setToken2(token);

    const searchAPI = async () => {
      const sellers = await getSellers(token);
      console.log(sellers);
      setArrayOfSellers(sellers);
    };
    searchAPI();
  }, [props]);

  const clickRemoveItem = (id) => {
    const newCar = arrCarrinho.reduce((acc, item) => {
      if (item.id !== id) {
        acc.push(item);
      }
      return acc;
    }, []);

    const allPrice = newCar.reduce((acc, item) => {
      acc += (item.price * item.qtd);
      return acc;
    }, 0);

    setTotalPrice(allPrice);

    setArrCarrinho(newCar);
  };
  const handleInputAddress = ({ target }) => setAdress(target.value);
  const handleInputNumber = ({ target }) => setNumberAdress(target.value);
  const handleSelect = ({ target }) => setSelectValue(target.value);

  const clickPostSale = async () => {
    const objSeller = arrayOfSellers.find((seller) => seller.name === selectValue);
    const objSaleInfos = {
      userId,
      sellerId: objSeller.id,
      totalPrice,
      deliveryAddress: adress,
      deliveryNumber: numberAdress,
      status: 'Pendente',
    };

    const arrToSend = arrCarrinho.map((item) => {
      const obj = {
        product_id: item.id,
        quantity: item.qtd,
      };
      return obj;
    });

    const objFinalSale = {
      sale: objSaleInfos,
      products: arrToSend,
    };

    const idSale = await apiPostSale(token2, objFinalSale);

    history.push(`/customer/orders/${idSale.id}`);
  };

  return (
    <div>
      <h3>Finalizar Pedido</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>remover</th>
          </tr>
        </thead>
        <tbody>
          {arrCarrinho.map((item, index) => (
            <tr key={ item.id }>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.qtd}</td>
              <td>{item.price.replace(/\./, ',')}</td>
              <td>
                {
                  (+item.qtd * +item.price)
                    .toFixed(2).toString().replace(/\./, ',')
                }

              </td>
              <td>
                <button
                  type="button"
                  onClick={ () => clickRemoveItem(item.id) }
                >
                  Remover item
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>{`Valor total: R$${totalPrice.toFixed(2).toString().replace(/\./, ',')}`}</p>
      <h3>Detalhes e Endereço para Entrega</h3>
      <form>
        <select value={ selectValue } onChange={ handleSelect }>
          {arrayOfSellers.map((seller) => (
            <option key={ seller.id }>{seller.name}</option>
          ))}
        </select>
        <label htmlFor="endereco">
          Endereço da entrega:
          <input
            type="text"
            placeholder="Endereço"
            id="endereco"
            onChange={ handleInputAddress }
            value={ adress }
          />
        </label>
        <label htmlFor="numero">
          Número da entrega:
          <input
            type="text"
            placeholder="Endereço"
            id="numero"
            onChange={ handleInputNumber }
            value={ numberAdress }
          />
        </label>
      </form>
      <button type="button" onClick={ clickPostSale }>Finalizar Pedido</button>
    </div>
  );
}

Checkout.propTypes = {
  carrinho: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    qtd: PropTypes.number,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  })).isRequired,
};

export default Checkout;
