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

const idAndName = { id: 1, name: 'Martelo de Thor' };

describe('Testando o products services', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Função findAllProducts', function () {
    it('Verifica a função findAllProducts', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProductsMock);
      const result = await productsServices.findAllProducts();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('Função findProductsById', function () {
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
  });

  describe('Função createProducts', function () {
    it('Verifica a função createProducts', async function () {
      sinon.stub(productsModel, 'create').resolves(idAndName);
      const result = await productsServices.createProduct('Martelo de Thor');
      expect(result).to.be.an('object');
    });
  });

  describe('Função deleteProducts', function () {
    it('Verifica a função deleteProducts', async function () {
      sinon.stub(productsModel, 'findById').resolves({
        saleId: 1,
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2,
      });
      sinon.stub(productsModel, 'del').resolves();
      await productsServices.deleteProduct(1);
    });

    it('Verifica se a função deleteProducts retorna um erro', async function () {
      sinon.stub(productsModel, 'findById').resolves(null);
      try {
        await productsServices.deleteProduct(1);
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });

  describe('Função updateProducts', function () {
    it('Verifica a função updateProducts', async function () {
      sinon.stub(productsModel, 'findById').resolves(productIdMock);
      sinon.stub(productsModel, 'update').resolves(idAndName);
      const result = await productsServices.updateProduct(1, 'Martelo de Thor');
      expect(result).to.be.an('object');
    });

    it('Verifica se a função updateProducts retorna um erro', async function () {
      sinon.stub(productsModel, 'findById').resolves(null);
      try {
        await productsServices.updateProduct(1, 'Martelo de Thor');
      } catch (error) {
        expect(error).to.be.an('error');
      }
    });
  });
});
