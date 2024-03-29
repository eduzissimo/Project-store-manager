const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const { describe, it } = mocha;
chai.use(sinonChai);
chai.use(chaiHttp);

const { allSalesMock, salesById } = require('../mocks/sales.mocks');
const sales = require('../../../src/models/sales.model');
const salesServices = require('../../../src/services/sales.services');

describe('Testando o service de sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica a função findAllSales', async function () {
    sinon.stub(sales, 'findAll').resolves(allSalesMock);
    const result = await salesServices.findAllSales();
    expect(result).to.be.an('array');
    expect(result).to.have.lengthOf(2);
  });

  it('Verifica se retorna o objeto correto quando passado um id', async function () {
    sinon.stub(sales, 'findById').resolves(salesById);
    const result = await salesServices.findSalesById(1);
    expect(result).to.be.an('array');
  });

  it('Verifica se quando nulo a função findSalesById retorna null', async function () {
    sinon.stub(sales, 'findById').resolves(null);
    const result = await salesServices.findSalesById(1);
    expect(result).to.equal(null);
  });

  it('Verifica a funcionalidade de createSale', async function () {
    const newSalesData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    sinon.stub(sales, 'findById').resolves({
      id: 1,
      name: 'Product 1',
      price: 10,
      quantity: 10,
    });
    sinon.stub(sales, 'create').resolves({
      id: 3,
      itemSold: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    });
    const result = await salesServices.createSales(newSalesData);
    expect(result).to.be.an('object');
  });

  it('Verifica se a função retorna product not found quando o produto não existe', async function () {
    const newSalesData = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];
    sinon.stub(sales, 'findById').resolves(null);
    try {
      await salesServices.createSales(newSalesData);
    } catch (error) {
      expect(error).to.be.an('object');
      expect(error.message).to.be.equal('Product not found');
    }
  });
});