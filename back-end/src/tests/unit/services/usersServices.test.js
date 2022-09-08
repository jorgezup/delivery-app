const sinon = require('sinon');
const { expect } = require('chai');

const {users} = require('../../mocks/usersMock')

const usersService = require('../../../api/services/user.register.service');

describe('User Service', function () {
  describe('Executa uma chamada na rota /users/sellers com o metodo get', function () {
    describe('quando não existe nenhum vendedor(a) cadastrado', function () {
      before(function () {
        sinon.stub(usersService, 'getAllSeller')
          .resolves([[]]);
      });
      after(function () {
        usersService.getAllSeller.restore();
      });

      it('verifica se o retorno é um array', async function () {
        const [result] = await usersService.getAllSeller();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('verifica se o array está vazio', async function () {
        const [result] = await usersService.getAllSeller();
        expect(result).to.be.empty;
      });
    });
    describe('quando existe vendedores(as) cadastrados(as)', function () {
      before(function () {
        sinon.stub(usersService, 'getAllSeller')
          .resolves([users]);
      });
      after(function () {
        usersService.getAllSeller.restore();
      });

      it('retornar um array', async function () {
        const [result] = await usersService.getAllSeller();
        expect(result)
          .to
          .be
          .an('array');
      });

      it('array não está vazio', async function () {
        const [result] = await usersService.getAllSeller();
        expect(result).to.not.be.empty;
      });

      it('array possui objetos', async function () {
        const [result] = await usersService.getAllSeller();
        expect(result[0])
          .to
          .be
          .an('object');
      });

      it('possui as seguintes propriedades: id, name, price, url_image', async function () {
        const [result] = await usersService.getAllSeller();
        expect(result[0])
          .to
          .include
          .all
          .keys('id', 'name', 'email', 'password', 'role');
      });
    });
  });

});
