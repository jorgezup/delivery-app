const sinon = require('sinon');
const { expect } = require('chai');

const orders = require('../../mocks/salesMock')

const sellersService = require('../../../api/services/sellers.service');

describe('Sellers Service', function () {
  describe('Executa uma chamada na rota /seller/orders com o metodo get', function () {
    describe('quando não existe nenhuma venda cadastrada', function () {
      before(function () {
        sinon.stub(sellersService, 'getAllOrders')
          .resolves([[]]);
      });
      after(function () {
        sellersService.getAllOrders.restore();
      });

      it('verifica se o retorno é um array', async function () {
        const [result] = await sellersService.getAllOrders();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('verifica se o array está vazio', async function () {
        const [result] = await sellersService.getAllOrders();
        expect(result).to.be.empty;
      });
    });
    describe('quando existe vendas cadastradas', function () {
      before(function () {
        sinon.stub(sellersService, 'getAllOrders')
          .resolves([orders]);
      });
      after(function () {
        sellersService.getAllOrders.restore();
      });

      it('retornar um array', async function () {
        const [result] = await sellersService.getAllOrders();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('array não está vazio', async function () {
        const [result] = await sellersService.getAllOrders();
        expect(result).to.not.be.empty;
      });

      it('array possui objetos', async function () {
        const [result] = await sellersService.getAllOrders();
        expect(result[0])
          .to
          .be
          .an('object');
      });

      it('possui as seguintes propriedades: id, name, price, url_image', async function () {
        const [result] = await sellersService.getAllOrders();
        expect(result[0])
          .to
          .include
          .all
          .keys('id', 'user_id', 'seller_id', 'total_price', 
            'delivery_address', 'delivery_number', 'sale_date', 'status');
      });
    });
  });
  describe('Executa uma chamada na rota /seller/orders/:id com o metodo get', () => {
    describe('quando não existe nenhuma venda cadastrada com o id informado', function () {
      before(function () {
        sinon.stub(sellersService, 'getSaleById')
          .resolves([[]]);
      });
      after(function () {
        sellersService.getSaleById.restore();
      });

      it('verifica se o retorno é um array', async function () {
        const [result] = await sellersService.getSaleById();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('verifica se o array está vazio', async function () {
        const [result] = await sellersService.getSaleById();
        expect(result).to.be.empty;
      });

    });
    describe('quando existe venda com o id informado', function () {
        before(function () {
          sinon.stub(sellersService, 'getSaleById')
            .resolves([orders[0]]);
        });
        after(function () {
          sellersService.getSaleById.restore();
        });

        it('retornar um array', async function () {
          const result = await sellersService.getSaleById();
          expect(result)
            .to
            .be
            .an('array');
        });

        it('array não está vazio', async function () {
          const result = await sellersService.getSaleById();
          expect(result).to.not.be.empty;
        });

        it('array possui objetos', async function () {
          const result = await sellersService.getSaleById();
          expect(result[0])
            .to
            .be
            .an('object');
        });

        it('possui as seguintes propriedades: id, name, price, url_image', async function () {
          const result = await sellersService.getSaleById();
          expect(result[0])
            .to
            .include
            .all
            .keys('id', 'user_id', 'seller_id', 'total_price',
              'delivery_address', 'delivery_number', 'sale_date', 'status');
        });
      });
  });
});
