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

    const item = arrProducts.find((product) => Number(id) === product.id);
    if (value < 0) {
      setQtdItem(0);
    } else {
      setQtdItem(value);
      const carItem = { ...item, qtd: Number(value) };
      const verifyArr = arrCar.filter((infos) => Number(id) === infos.id);
      if (verifyArr.length > 0) {
        const newArr = arrCar.map((itemsCar) => {
          if (itemsCar.id === Number(id)) {
            itemsCar.qtd = Number(value);
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

  const addValue = (id) => {
    console.log(id);

    setQtdItem(qtdItem + 1);

    const item = arrProducts.find((product) => Number(id) === product.id);
    console.log('item', item);
    const carItem = { ...item, qtd: qtdItem + 1 };
    console.log(carItem);

    const verifyArr = arrCar.filter((infos) => id === infos.id);
    if (verifyArr.length > 0) {
      const newArr = arrCar.map((itemsCar) => {
        if (itemsCar.id === Number(id)) {
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

  const rmValue = (id) => {
    const newValue = qtdItem - 1;

    if (newValue < 0) {
      setQtdItem(0);
    } else {
      setQtdItem(newValue);

      const item = arrProducts.find((product) => Number(id) === product.id);
      const carItem = { ...item, qtd: newValue };
      const verifyArr = arrCar.filter((infos) => Number(id) === infos.id);

      if (verifyArr.length > 0) {
        const newArr = arrCar.map((itemsCar) => {
          if (itemsCar.id === Number(id)) {
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
      {console.log(arrCar)}
      {arrProducts.map((items) => (
        <div key={ items.id }>
          <img
            src={ items.urlImage }
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
            {items.price}
          </p>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${items.id}` }
            onClick={ () => rmValue(items.id) }
            id={ items.id }
          >
            -
          </button>
          <input
            type="number"
            min="0"
            value={ qtdItem }
            data-testid={ `customer_products__input-card-quantity-${items.id}` }
            onChange={ changeInput }
            id={ items.id }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${items.id}` }
            onClick={ () => addValue(items.id) }
            id={ items.id }
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default TableProducts;
