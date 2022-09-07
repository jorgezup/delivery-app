const sinon = require('sinon');
const { expect } = require('chai');

const products = require('../../mocks/productsMock')

const productsService = require('../../../api/services/products.service');

describe('Products Service', function () {
  describe('Executa uma chamada na rota /products com o metodo get', function () {
    describe('quando não existe nenhum produto criado', function () {
      before(function () {
        sinon.stub(productsService, 'getAllProducts')
          .resolves([[]]);
      });
      after(function () {
        productsService.getAllProducts.restore();
      });

      it('verifica se o retorno é um array', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('verifica se o array está vazio', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result).to.be.empty;
      });
    });
    describe('quando existe produtos cadastrados', function () {
      before(function () {
        sinon.stub(productsService, 'getAllProducts')
          .resolves([products]);
      });
      after(function () {
        productsService.getAllProducts.restore();
      });

      it('retornar um array', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('array não está vazio', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result).to.not.be.empty;
      });

      it('array possui objetos', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result[0])
          .to
          .be
          .an('object');
      });

      it('possui as seguintes propriedades: id, name, price, url_image', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result[0])
          .to
          .include
          .all
          .keys('id', 'name', 'price', 'url_image');
      });

      it('verifica se o array contem 11 produtos', async function () {
        const [result] = await productsService.getAllProducts();
        expect(result).to.have.lengthOf(11)
      });
    });
  });

});
