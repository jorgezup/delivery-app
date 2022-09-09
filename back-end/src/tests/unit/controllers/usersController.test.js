const { expect } = require('chai');
const sinon = require('sinon');
const usersService = require('../../../api/services/user.register.service');
const usersController = require('../../../api/controllers/user.controller');

const mockRequest = (params, body) => ({params, body})

const mockResponse = () => {
  const response = {}
  response.status = sinon.stub().returns(response)
  response.json = sinon.stub().returns()
  response.end = sinon.stub().returns()
  return response
}

const {users} = require('../../mocks/usersMock');

const sellers = users.filter((user) => user.role === 'seller');


describe('Users Controller', () => {
  describe('Executa uma chamada na rota /users/sellers com o metodo GET', () => {
    describe('quando não existe nenhum vendedor cadastrado', () => {
      before(() => {
        sinon.stub(usersService, 'getAllSeller').resolves([[]]);
      });

      after(() => {
        usersService.getAllSeller.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await usersController.getAllSeller(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array', async () => {
        await usersController.getAllSeller(req, res);
        expect(res.json.calledWith([[]])).to.be.true;
      });
    })
    describe('quando existe um vendedor(a) cadastrado(a)', () => {
      before(() => {

        sinon.stub(usersService, 'getAllSeller').resolves(sellers);
      });

      after(() => {
        usersService.getAllSeller.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await usersController.getAllSeller(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array com todos os vendedores(as)', async () => {
        await usersController.getAllSeller(req, res);
        expect(res.json.calledWith(sellers)).to.be.true;
      });
    })
  })
});
