const sinon = require('sinon');
const chai = require('chai');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(sinonChai);
chai.use(chaiHttp);
const { expect } = chai;
const { describe, it } = mocha;

const { productIdMock, allProductsMock } = require('../mocks/product.mocks');
const productsServices = require('../../../src/services/product.services');
const productsController = require('../../../src/controllers/products.controller');

describe('Testando o products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Verifica a função findAll do products controller', function () {
    it('Verifica se retorna todos os produtos', async function () {
      sinon.stub(productsServices, 'findAllProducts').resolves(allProductsMock);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.findAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('Verifica se retorna o erro 404 quando não encontra o produto', async function () {
      sinon.stub(productsServices, 'findAllProducts').resolves(null);
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.findAllProducts(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('Testando o findProductsById do products controller', function () {
    it('Verifica se retorna o produto', async function () {
      sinon.stub(productsServices, 'findProductsById').resolves(productIdMock);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.findProductsById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('Verifica se retorna o erro 404 quando não encontra o produto pelo id', async function () {
      sinon.stub(productsServices, 'findProductsById').resolves(null);
      const req = {
        params: {
          id: 9,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.findProductsById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });

  describe('Verifica a função createProducts do products controller', function () {
    it('Verifica se cria um product novo', async function () {
      const req = {
        body: {
          name: 'Produto Teste',
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.createProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
    });
  });
});
