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
const { salesModel } = require('../../../src/models');

describe('Testando o model de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Função findAll', function () {
    it('Verifica a função findAll', async function () {
      sinon.stub(connection, 'query').resolves([
        [
          {
            saleId: 1,
            date: '2021-09-30T00:00:00.000Z',
            productId: 1,
            quantity: 1,
          },
          {
            saleId: 1,
            date: '2021-09-30T00:00:00.000Z',
            productId: 2,
            quantity: 2,
          },
        ],
      ]);
      const result = await salesModel.findAll();
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(2);
    });
  });

  describe('Função findById', function () {
    it('Verifica a função findById', async function () {
      sinon.stub(connection, 'query').resolves([
        [
          {
            date: '2021-09-30T00:00:00.000Z',
            productId: 1,
            quantity: 1,
          },
        ],
      ]);
      const result = await salesModel.findById(1);
      expect(result).to.be.an('array');
      expect(result.length).to.be.equal(1);
    });

    it('Verifica se quando nulo a função findSalesById retorna null', async function () {
      sinon.stub(connection, 'query').resolves([[]]);
      const result = await salesModel.findById(1);
      expect(result).to.be.equal(null);
    });
  });

  describe('Função create', function () {
    it('Verifica a função create', async function () {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }, {}]);
      const result = [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 2,
        },
      ];
      const newResult = await salesModel.create(result);
      expect(newResult).to.be.an('object');
      expect(newResult).to.have.property('id');
      expect(newResult.itemsSold).to.be.an('array');
      expect(newResult.itemsSold).to.have.lengthOf(2);
    });
  });

  describe('Função update', function () {
    it('Verifica a função update', async function () {
      sinon.stub(connection, 'query').resolves([{}]);
      const result = await salesModel.update(1, 3, 5);
      expect(result).to.be.an('object');
    });
  });

  describe('Testa a função delete', function () {
    it('Verifica se a função delete deleta um produto', async function () {
      sinon.stub(connection, 'query').resolves([{}]);
      const result = await salesModel.del(1);
      expect(result).to.be.equal(undefined);
    });
  });
});
