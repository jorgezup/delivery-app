const { expect } = require('chai');
const sinon = require('sinon');
const adminService = require('../../../api/services/admin.service');
const adminController = require('../../../api/controllers/admin.controller');

const mockRequest = (params, body) => ({params, body})

const mockResponse = () => {
  const response = {}
  response.status = sinon.stub().returns(response)
  response.json = sinon.stub().returns()
  response.end = sinon.stub().returns()
  return response
}

const users = require('../../mocks/usersMock');

const noAdminUsers = users.filter((user) => user.role !== 'administrator');

describe('Users Controller', () => {
  describe('Executa uma chamada na rota /admin/manage com o metodo GET', () => {
    describe('quando não existe nenhum usuário cadastrado', () => {
      before(() => {
        sinon.stub(adminService, 'getAllUsers').resolves([[]]);
      });

      after(() => {
        adminService.getAllUsers.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await adminController.getAllUsers(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array', async () => {
        await adminController.getAllUsers(req, res);
        expect(res.json.calledWith([[]])).to.be.true;
      });
    })
    describe('quando existe um usuário(a) cadastrado(a)', () => {
      before(() => {

        sinon.stub(adminService, 'getAllUsers').resolves(noAdminUsers);
      });

      after(() => {
        adminService.getAllUsers.restore();
      });

      const req = mockRequest()
      const res = mockResponse()

      it('Verifica se o retorno é o Código 200', async () => {
        await adminController.getAllUsers(req, res);
        expect(res.status.calledWith(200)).to.be.true;
      });

      it('Verifica se o retorno esperado é um array com todos os usuários(as) não administradores', async () => {
        await adminController.getAllUsers(req, res);
        expect(res.json.calledWith(noAdminUsers)).to.be.true;
      });
    })
  })
});
