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
const products = require('../../../src/models/products.model');

describe('Testando o model de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
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
    const result = await products.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(2);
  });

  it('Verifica se quando nulo a função findAll retorna um array vazio', async function () {
    sinon.stub(connection, 'query').resolves([[]]);
    const result = await products.findAll();
    expect(result).to.be.an('array');
    expect(result.length).to.be.equal(0);
  });

  it('Verifica a função findById', async function () {
    sinon.stub(connection, 'query').resolves([
      [
        {
          id: 1,
          name: 'Martelo de Thor',
        },
      ],
    ]);
    const result = await products.findById(1);
    expect(result).to.be.an('object');
    expect(result.id).to.be.equal(1);
  });

  it('Verifica se quando nulo a função findProductsById retorna null', async function () {
    sinon.stub(connection, 'query').resolves([[]]);
    const result = await products.findById(1);
    expect(result).to.be.equal(null);
  });

  it('Verifica a função create', async function () {
    sinon.stub(connection, 'query').resolves([
      {
        insertId: 1,
      },
    ]);
    const result = await products.create('Martelo de Thor');
    expect(result).to.be.an('object');
    expect(result).to.have.property('id');
    expect(result).to.have.property('name');
  });
});