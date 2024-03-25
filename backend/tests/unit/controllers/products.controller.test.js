const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const { describe, it } = mocha;
chai.use(sinonChai);
chai.use(chaiHttp);

const { productMock, productsMock } = require('../mocks/product.mocks');
const products = require('../../../src/models/products.model');
const productsController = require('../../../src/controllers/products.controller');

describe('Testando o findAll do products controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verifica se retorna todos os produtos', async function () {
    sinon.stub(products, 'findAll').resolves(productsMock);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica se retorna o erro 404 quando não encontra o produto', async function () {
    sinon.stub(products, 'findAll').resolves(null);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  describe('Testando o findById do products controller', function () {
    it('Verifica se retorna o produto', async function () {
      sinon.stub(products, 'findById').resolves(productMock);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
    });

    it('Verifica se retorna o erro 404 quando não encontra o produto', async function () {
      sinon.stub(products, 'findById').resolves(null);
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      await productsController.findById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });
});
