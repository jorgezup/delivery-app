// module.exports = {
//   up: async (queryInterface, _Sequelize) => {
//     await queryInterface.bulkInsert(
//       "sales_products",
//       [
//         {
//           sale_id: 1,
//           product_id: 2, // 7.50
//           quantity: 1,
//         }, // 1 * 7.50 = 7.50
//         {
//           sale_id: 1,
//           product_id: 7, // 4.99
//           quantity: 5,
//         }, // 5 * 4.99 = 24.95
//         {
//           sale_id: 1,
//           product_id: 3, // 2.49
//           quantity: 4,
//         }, // 4 * 2.49 = 9.96 ---------> total: 7.50 + 24.95 + 9.96 = 37.45
//         {
//           sale_id: 2,
//           product_id: 8, // 2.79
//           quantity: 7,
//         }, // 7 * 2.79 = 15.57
//         {
//           sale_id: 2,
//           product_id: 3, // 2.49
//           quantity: 5,
//         }, // 5 * 2.49 = 9.96 ---------> total: 15.57 + 9.96 = 25.55
//         {
//           sale_id: 3,
//           product_id: 6, // 4.49
//           quantity: 4,
//         }, // 4 * 4.49 = 19.96 ---------> total: 19.96 
//       ],
//       { timestamps: false }
//     );
//   },

//   down: async (queryInterface, _Sequelize) => {
//     await queryInterface.bulkDelete("sales_products", null, {});
//   },
// };