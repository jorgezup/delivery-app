const { expect } = require('chai');
const sinon = require('sinon');
const sellersService = require('../../../api/services/sellers.service');
const sellersController = require('../../../api/controllers/sellers.controller');

const mockRequest = (params, body) => ({params, body})

const mockResponse = () => {
  const response = {}
  response.status = sinon.stub().returns(response)
  response.json = sinon.stub().returns()
  response.end = sinon.stub().returns()
  response.locals = {user: 2}
  return response
}

const orders = require('../../mocks/salesMock');

const orderParams = 1
const ordersSeller = orders.filter((order) => order.seller_id === 2)
const orderById = ordersSeller.filter(order => order.id === orderParams)


describe('Sellers Controller', () => {
  describe('Executa uma chamada na rota /seller/orders com o metodo GET', () => {
    describe('quando não existe nenhum venda cadastrada', () => {
      before(() => {
        sinon.stub(sellersService, 'getAllOrders').resolves([[]]);
      });

      after(() => {
        sellersService.getAllOrders.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await sellersController.getAllOrders(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array', async () => {
        await sellersController.getAllOrders(req, res);
        expect(res.json.calledWith([[]])).to.be.true;
      });
    })
    describe('quando existe venda cadastrada', () => {
      before(() => {

        sinon.stub(sellersService, 'getAllOrders').resolves(ordersSeller);
      });

      after(() => {
        sellersService.getAllOrders.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await sellersController.getAllOrders(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array com todos as vendas', async () => {
        await sellersController.getAllOrders(req, res);
        expect(res.json.calledWith(ordersSeller)).to.be.true;
      });
    })
  })
  describe('Executa uma chamada na rota /seller/orders/:id com o metodo GET', () => {
    describe('quando não existe nenhum venda cadastrada com o id informado', () => {
      before(() => {
        sinon.stub(sellersService, 'getSaleById').resolves([[]]);
      });

      after(() => {
        sellersService.getSaleById.restore();
      });

      const req = mockRequest({params: 99})
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await sellersController.getSaleById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array', async () => {
        await sellersController.getSaleById(req, res);
        expect(res.json.calledWith([[]])).to.be.true;
      });
    })
    describe('quando existe venda com id informado', () => {
      before(() => {

        sinon.stub(sellersService, 'getSaleById').resolves(orderById);
      });

      after(() => {
        sellersService.getSaleById.restore();
      });

      const req = mockRequest({params: orderParams})
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await sellersController.getSaleById(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array com a venda de ID informado', async () => {
        await sellersController.getSaleById(req, res);
        expect(res.json.calledWith(orderById)).to.be.true;
      });
    })
  })
  describe('Executa uma chamada na rota /seller/orders/status com o metodo PATCH', () => {
    describe('Em caso de sucesso', () => {
      const req = mockRequest({id: 4},{
        "status": "Preparando",
        "userId": 2
      })
      const res = mockResponse()

      let stubService
      before(() => {
        stubService = sinon.stub(sellersService, 'changeStatus').resolves({
          "id": 4,
          "status": "Preparando",
          "userId": 2
        })
      });

      after(() => {
        sellersService.changeStatus.restore();
      });

      it('Verifica se o retorno é o 200', async () => {
        await sellersController.changeStatus(req, res);
        expect(stubService.calledOnce)
        expect(res.status.calledWith(200)).to.be.true
        expect(res.json.calledWith({
          "id": 4,
          "status": "Preparando",
          "userId": 2
        })).to.be.true
      });
    })
    describe('Em caso de falha', () => {
      const req = mockRequest({id: 4},{
        "status": "Preparando",
        "userId": 2
      })
      const res = mockResponse()
      /* https://sinonjs.org/releases/latest/fakes/ */
      const next = sinon.fake.returns({status: 404, message: 'Sale not found'})

      let stubService
      before(() => {
        stubService = sinon.stub(sellersService, 'changeStatus').resolves(false)
      });

      after(() => {
        sellersService.changeStatus.restore();
      });

      it('Verifica se o retorno é o Código 404 - Sale not found', async () => {
        await sellersController.changeStatus(req, res, next);
        expect(stubService.calledOnce)
        expect(next()).to.be.deep.equals({status: 404, message: 'Sale not found'})
      });
    })
  })
});
