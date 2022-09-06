// module.exports = {
//   up: async (queryInterface, _Sequelize) => {
//     await queryInterface.bulkInsert(
//       "sales",
//       [
//         {
//           id: 1,
//           user_id: 3, // Cliente Zé Birita
//           seller_id: 2, // Fulana Pereira
//           total_price: 37.45,
//           delivery_address: 'Rua São Paulo',
//           delivery_number: '123',
//           sale_date: '2022-08-28 09:00:00',
//           status: 'Pendente',
//         },
//         {
//           id: 2,
//           user_id: 3, // Cliente Zé Birita
//           seller_id: 5, // Maria da Silva
//           total_price: 25.55,
//           delivery_address: 'Rua Serra',
//           delivery_number: '456',
//           sale_date: '2022-08-27 18:00:00',
//           status: 'Preparando',
//         },
//         {
//           id: 3,
//           user_id: 4, // João da Silva
//           seller_id: 2, // Fulana Pereira
//           total_price: 19.96,
//           delivery_address: 'Rua Maranhão',
//           delivery_number: '321',
//           sale_date: '2022-07-17 12:00:00',
//           status: 'Entregue',
//         },

//       ],
//       { timestamps: false }
//     );
//   },

//   down: async (queryInterface, _Sequelize) => {
//     await queryInterface.bulkDelete("sales", null, {});
//   },
// };