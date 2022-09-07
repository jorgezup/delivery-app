const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../api/services/products.service');
const productsController = require('../../../api/controllers/products.controller');


const mockRequest = (params, body) => ({params, body})

const mockResponse = () => {
  const response = {}
  response.status = sinon.stub().returns(response)
  response.json = sinon.stub().returns()
  response.end = sinon.stub().returns()
  return response
}

const products = require('../../mocks/productsMock');

describe('Products Controller', () => {
  describe('Executa uma chamada na rota /products com o metodo GET', () => {
    describe('quando não existe nenhum produto criado', () => {
      before(() => {
        sinon.stub(productsService, 'getAllProducts').resolves([[]]);
      });

      after(() => {
        productsService.getAllProducts.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await productsController.getAllProducts(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array', async () => {
        await productsController.getAllProducts(req, res);
        expect(res.json.calledWith([[]])).to.be.true;
      });
    })
    describe('quando existe produto criado', () => {
      before(() => {
        sinon.stub(productsService, 'getAllProducts').resolves(products);
      });

      after(() => {
        productsService.getAllProducts.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await productsController.getAllProducts(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array com todos os produtos', async () => {
        await productsController.getAllProducts(req, res);
        expect(res.json.calledWith(products)).to.be.true;
      });
    })
  })  
});
