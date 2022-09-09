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

const {users, newUser, newUserWithId} = require('../../mocks/usersMock');

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
  describe('Executa uma chamada na rota /admin/manage com o metodo POST', () => {
    describe('Em caso de sucesso', () => {
        const req = mockRequest({},newUser)
        const res = mockResponse()

        let stubService
        before(() => {
          stubService = sinon.stub(adminService, 'createUser').resolves(newUserWithId)
        });

        after(() => {
          adminService.createUser.restore();
        });

        it('Verifica se o retorno é o 201', async () => {
          await adminController.createUser(req, res);
          expect(stubService.calledOnce)
          expect(res.status.calledWith(201)).to.be.true
          expect(res.json.calledWith(newUserWithId)).to.be.true
        });
      })
    describe('Em caso de falha', () => {
      const req = mockRequest()
      const res = mockResponse()
      /* https://sinonjs.org/releases/latest/fakes/ */
      const next = sinon.fake.returns({status: 409, message: 'User already exists'})

      let stubService
      before(() => {
        stubService = sinon.stub(adminService, 'createUser').resolves(false)
      });

      after(() => {
        adminService.createUser.restore();
      });

      it('Verifica se o retorno é o Código 409 - Product already exists', async () => {
        await adminController.createUser(req, res, next);
        expect(stubService.calledOnce)
        expect(next()).to.be.deep.equals({status: 409, message: 'User already exists'})
      });
    })
    })
  describe('Executa uma chamada na rota /admin/manage/:id com o metodo DELETE', () => {
    describe('Em caso de sucesso', () => {
      const req = mockRequest({id: 4})
      const res = mockResponse()

      let stubService
      before(() => {
        stubService = sinon.stub(adminService, 'deleteUser').resolves(true)
      });

      after(() => {
        adminService.deleteUser.restore();
      });

      it('Verifica se o retorno é o 204', async () => {
        await adminController.deleteUser(req, res);
        expect(stubService.calledOnce)
        expect(res.status.calledWith(204)).to.be.true
        expect(res.end.calledWith()).to.be.true
      });
    })
    describe('Em caso de falha', () => {
      const req = mockRequest({id: 4})
      const res = mockResponse()
      /* https://sinonjs.org/releases/latest/fakes/ */
      const next = sinon.fake.returns({status: 404, message: 'User not found'})

      let stubService
      before(() => {
        stubService = sinon.stub(adminService, 'deleteUser').resolves(false)
      });

      after(() => {
        adminService.deleteUser.restore();
      });

      it('Verifica se o retorno é o Código 404 - User not found', async () => {
        await adminController.deleteUser(req, res, next);
        expect(stubService.calledOnce)
        expect(next()).to.be.deep.equals({status: 404, message: 'User not found'})
      });
    })
  })
});
