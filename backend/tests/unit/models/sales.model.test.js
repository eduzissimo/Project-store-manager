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
const sales = require('../../../src/models/sales.model');

describe('Testando o model de vendas', function () {
  afterEach(function () {
    sinon.restore();
  });

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
    const result = await sales.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(2);
  });

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
    const result = await sales.findById(1);
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(1);
  });

  it('Verifica se quando nulo a função findSalesById retorna null', async function () {
    sinon.stub(connection, 'query').resolves([[]]);
    const result = await sales.findById(1);
    expect(result).to.be.equal(null);
  });
});