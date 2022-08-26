import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import listProducts from '../API_Calls/listProducts';

function TableProducts() {
  const [arrProducts, setArrProducts] = useState([]);
  const [qtdItem, setQtdItem] = useState(0);
  const [arrCar, setArrCar] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    const localData = localStorage.getItem('userInfos');
    const objUser = JSON.parse(localData);

    const getProduts = async () => {
      const list = await listProducts(objUser.token);
      setArrProducts(list);
    };
    getProduts();
  }, []);

  const changeInput = ({ target }) => {
    const { value, id } = target;
    const item = arrProducts.find((product) => id === product.id);
    if (value < 0) {
      setQtdItem(0);
    } else {
      setQtdItem(value);
      const carItem = { ...item, qtd: value };
      const verifyArr = arrCar.filter((infos) => id === infos.id);
      if (verifyArr.length > 0) {
        const newArr = arrCar.map((itemsCar) => {
          if (itemsCar.id === id) {
            itemsCar.qtd = value;
          }
          const obj = {
            id: itemsCar.id,
            img: itemsCar.img,
            name: itemsCar.name,
            preco: itemsCar.preco,
            qtd: itemsCar.qtd,
          };
          return obj;
        });
        setArrCar(newArr);
      } else {
        setArrCar([...arrCar, carItem]);
      }
    }
  };

  const addValue = ({ target }) => {
    const { id } = target;

    setQtdItem(qtdItem + 1);

    const item = arrProducts.find((product) => id === product.id);
    const carItem = { ...item, qtd: qtdItem + 1 };

    const verifyArr = arrCar.filter((infos) => id === infos.id);
    if (verifyArr.length > 0) {
      const newArr = arrCar.map((itemsCar) => {
        if (itemsCar.id === id) {
          itemsCar.qtd = qtdItem + 1;
        }
        const obj = {
          id: itemsCar.id,
          img: itemsCar.img,
          name: itemsCar.name,
          preco: itemsCar.preco,
          qtd: itemsCar.qtd,
        };
        return obj;
      });
      setArrCar(newArr);
    } else {
      setArrCar([...arrCar, carItem]);
    }
  };

  const rmValue = ({ target }) => {
    const newValue = qtdItem - 1;
    const { id } = target;

    if (newValue < 0) {
      setQtdItem(0);
    } else {
      setQtdItem(newValue);

      const carItem = { ...item, qtd: newValue };
      const verifyArr = arrCar.filter((infos) => id === infos.id);

      if (verifyArr.length > 0) {
        const newArr = arrCar.map((itemsCar) => {
          if (itemsCar.id === id) {
            itemsCar.qtd = newValue;
          }
          const obj = {
            id: itemsCar.id,
            img: itemsCar.img,
            name: itemsCar.name,
            preco: itemsCar.preco,
            qtd: itemsCar.qtd,
          };
          return obj;
        });
        setArrCar(newArr);
      } else {
        setArrCar([...arrCar, carItem]);
      }
    }
  };

  return (
    <div>
      {arrProducts.map((items) => (
        <div key={ items.id }>
          <img
            src={ items.img }
            alt="imagem de cerveja"
            data-testid={ `customer_products__img-card-bg-image-${items.id}` }
          />
          <p
            data-testid={ `customer_products__element-card-title-${items.id}` }
          >
            {items.name}
          </p>
          <p
            data-testid={ `customer_products__element-card-price-${items.id}` }
          >
            {items.preco}
          </p>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${items.id}` }
            onClick={ rmValue }
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={ qtdItem }
            data-testid={ `customer_products__input-card-quantity-${items.id}` }
            onChange={ changeInput }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${items.id}` }
            onClick={ addValue }
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default TableProducts;
