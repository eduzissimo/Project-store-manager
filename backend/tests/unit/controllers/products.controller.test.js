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
const { productsServices } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

describe('Testando o products controller', function () {
  afterEach(function () {
    sinon.restore();
  });

  describe('Verifica a função findAll do products controller', function () {
    describe('findAllProducts', function () {
      it('Verifica se retorna todos os produtos', async function () {
        sinon
          .stub(productsServices, 'findAllProducts')
          .resolves(allProductsMock);
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
        sinon
          .stub(productsServices, 'findProductsById')
          .resolves(productIdMock);
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

    describe('Função createProducts do products controller', function () {
      it('Verifica se cria um product novo', async function () {
        const req = {
          body: {
            name: 'Martelo de Thor',
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

    describe('Função updateProduct', function () {
      it('Verifica se realiza o update de um produto', async function () {
        sinon.stub(productsServices, 'updateProduct').resolves(productIdMock);
        const req = {
          params: {
            id: 1,
          },
          body: {
            name: 'Martelo do Batman',
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
        await productsController.updateProduct(req, res);
        expect(res.status).to.have.been.calledWith(200);
      });

      it('Verifica se retorna 404 quando o produto não é encontrado', async () => {
        sinon
          .stub(productsServices, 'updateProduct')
          .throws(new Error('Product not found'));
        const req1 = {
          params: { id: 1 },
          body: { name: 'Martelo do Thor' },
        };
        const res1 = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
        await productsController.updateProduct(req1, res1);
        expect(res1.status).to.have.been.calledWith(404);
      });

      describe('Função deleteProducts', function () {
        it('Verifica a função deleteProducts', async function () {
          sinon.stub(productsServices, 'deleteProduct').resolves();
          const req = {
            params: {
              id: 1,
            },
          };
          const res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
          };
          await productsController.deleteProduct(req, res);
          expect(res.status).to.have.been.calledWith(204);
        });
      });
    });
  });
});
