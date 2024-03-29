const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const { describe, it } = mocha;
chai.use(sinonChai);
chai.use(chaiHttp);

const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');

describe('Testando o model de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Função findAll', function () {
    it('Verifica a função findAll', async function () {
      sinon.stub(connection, 'query').resolves([
        [
          {
            id: 1,
            name: 'Martelo de Thor',
          },
          {
            id: 2,
            name: 'Traje de encolhimento',
          },
        ],
      ]);
      const result = await productsModel.findAll();
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
    });

    it('Verifica se quando nulo a função findAll retorna um array vazio', async function () {
      sinon.stub(connection, 'query').resolves([[]]);
      const result = await productsModel.findAll();
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(0);
    });
  });

  describe('Função findById', function () {
    it('Verifica a função findById', async function () {
      sinon.stub(connection, 'query').resolves([
        [
          {
            id: 1,
            name: 'Martelo de Thor',
          },
        ],
      ]);
      const result = await productsModel.findById(1);
      expect(result).to.be.an('object');
      expect(result.id).to.be.equal(1);
    });

    it('Verifica se quando nulo a função findProductsById retorna null', async function () {
      sinon.stub(connection, 'query').resolves([[]]);
      const result = await productsModel.findById(1);
      expect(result).to.be.equal(null);
    });
  });

  describe('Função create', function () {
    it('Verifica a função create', async function () {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      const result = await productsModel.create(1, 'Martelo de Thor');
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
    });
  });

  describe('Função update', function () {
    it('Verifica a função update', async function () {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.update(1, 'Martelo de Thor');
      expect(result).to.be.an('object');
    });
  });

  describe('Função del', function () {
    it('Verifica a função del', async function () {
      sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
      await productsModel.del(1);
    });
  });
});
