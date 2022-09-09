const sinon = require('sinon');
const { expect } = require('chai');

const {users} = require('../../mocks/usersMock')
const adminService = require('../../../api/services/admin.service');
const noAdminUsers = users.filter((user) => user.role !== 'administrator');

describe('Admin Service', function () {
  describe('Executa uma chamada na rota /admin/manage com o metodo get', function () {
    describe('quando não existe nenhum usuário(a) cadastrado(a)', function () {
      before(function () {
        sinon.stub(adminService, 'getAllUsers')
          .resolves([[]]);
      });
      after(function () {
        adminService.getAllUsers.restore();
      });

      it('verifica se o retorno é um array', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('verifica se o array está vazio', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result).to.be.empty;
      });
    });
    describe('quando existe usuários(as) cadastrados(as)', function () {
      before(function () {
        sinon.stub(adminService, 'getAllUsers')
          .resolves([noAdminUsers]);
      });
      after(function () {
        adminService.getAllUsers.restore();
      });

      it('retornar um array', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('array não está vazio', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result).to.not.be.empty;
      });

      it('array possui objetos', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result[0])
          .to
          .be
          .an('object');
      });

      it('possui as seguintes propriedades: id, name, price, url_image', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result[0])
          .to
          .include
          .all
          .keys('id', 'name', 'email', 'password', 'role');
      });

      it('possui 4 usuários não administradores cadastrados', async function () {
        const [result] = await adminService.getAllUsers();
        expect(result).to.have.lengthOf(4);
      });
    });
  });
});
