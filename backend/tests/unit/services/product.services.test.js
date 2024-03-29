const sinon = require('sinon');
const chai = require('chai');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(sinonChai);
chai.use(chaiHttp);
const { expect } = chai;
const { describe, it } = mocha;

const { productsServices } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { allProductsMock, productIdMock } = require('../mocks/product.mocks');

describe('Testando o products services', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica a função findAllProducts', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsMock);
    const result = await productsServices.findAllProducts();
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
  });

  it('Verifica a função findProductsById', async function () {
    sinon.stub(productsModel, 'findById').resolves(productIdMock);
    const result = await productsServices.findProductsById(1);
    expect(result).to.be.an('object');
  });

  it('Verifica se quando nulo a função findProductsById retorna null', async function () {
    sinon.stub(productsModel, 'findById').resolves(null);
    const result = await productsServices.findProductsById(1);
    expect(result).to.be.equal(null);
  });

  it('Verifica a função createProducts', async function () {
    sinon.stub(productsModel, 'create').resolves({ id: 1, name: 'Martelo de Thor' });
    const result = await productsServices.createProduct('Martelo de Thor');
    expect(result).to.be.an('object');
  });
});
