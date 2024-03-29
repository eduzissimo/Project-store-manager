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
    const result = await salesServices.findSaleById(1);
    expect(result).to.be.an('array');
  });

  it('Verifica se quando nulo a função findSalesById retorna null', async function () {
    sinon.stub(sales, 'findById').resolves(null);
    const result = await salesServices.findSaleById(1);
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

  it('Verifica se a função createSale retorna erro quando o produto não existe', async function () {
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
      expect(error).to.be.an('error');
    }
  });

  describe('Testando a função updateSales', function () {
    it('Verifica se a função retorna erro quando a venda não existe', async function () {
      sinon.stub(sales, 'findById').resolves(null);
      try {
        await salesServices.updateSales(1, 1, 1);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('Sale not found');
      }
    });

    it('Verifica se a função retorna erro quando o produto não existe', async function () {
      sinon.stub(sales, 'findById').resolves({
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 10,
      });
      try {
        await salesServices.updateSales(1, 1, 1);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('Product not found');
      }
    });

    it('Verifica se a função update retorna o objeto correto', async function () {
      sinon.stub(sales, 'findById').resolves({
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 10,
      });
      sinon.stub(sales, 'update').resolves({
        id: 1,
        name: 'Product 1',
        price: 10,
        quantity: 10,
      });
      const result = await salesServices.updateSales(1, 1, 1);
      expect(result).to.be.an('object');
    });
  });

  describe('Testando a função deleteSales', function () {
    it('Verifica se a função retorna null quando a venda não existe', async function () {
      sinon.stub(sales, 'findById').resolves(null);
      try {
        await salesServices.deleteSale(1);
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.be.equal('Sale not found');
      }
    });

    it('Verifica se a função retorna o objeto correto', async function () {
      sinon.stub(sales, 'findById').resolves({
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      });
      sinon.stub(sales, 'del').resolves();
      await salesServices.deleteSale(1);
    });

    it('Verifica se a função retorna erro', async function () {
      sinon.stub(sales, 'findById').resolves(null);
      try {
        await salesServices.deleteSale(1);
      } catch (error) {
        expect(error.message).to.equal('Sale not found');
      }
    });
  });
});
