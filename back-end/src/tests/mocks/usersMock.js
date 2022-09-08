const users = [
  {
    "id": 1,
    "name": "Delivery App Admin",
    "email": "adm@deliveryapp.com",
    "password": "a4c86edecc5aee06eff8fdeda69e0d04",
    "role": "administrator"
  },
  {
    "id": 2,
    "name": "Fulana Pereira",
    "email": "fulana@deliveryapp.com",
    "password": "3c28d2b0881bf46457a853e0b07531c6",
    "role": "seller"
  },
  {
    "id": 3,
    "name": "Cliente Zé Birita",
    "email": "zebirita@email.com",
    "password": "1c37466c159755ce1fa181bd247cb925",
    "role": "customer"
  },
  {
    "id": 4,
    "name": "João da Silva",
    "email": "joao@email.com",
    "password": "1c37466c159755ce1fa181bd247cb925",
    "role": "customer"
  },
  {
    "id": 5,
    "name": "Maria da Silva",
    "email": "maria@deliveryapp.com",
    "password": "3c28d2b0881bf46457a853e0b07531c6",
    "role": "seller"
  }
];

const newUser =   {
  "name": "Joao Lucas",
  "email": "joaolucas@deliveryapp.com",
  "password": "3c28d2b0881bf46457a853e0b07531c6",
  "role": "seller"
}

const newUserWithId =   {
  "id": 6,
  "name": "Joao Lucas",
  "email": "joaolucas@deliveryapp.com",
  "password": "3c28d2b0881bf46457a853e0b07531c6",
  "role": "seller"
}

module.exports = {users, newUser, newUserWithId};
