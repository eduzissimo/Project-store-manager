const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;

const middlewareSales = require('../../../src/middlewares/salesValidation.middlewares');

describe('Testando o middleware de validação de criação de vendas', function () {
  describe('validateSale', () => {
    it('Verifica se retorna um erro se a venda não for um array', async () => {
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      middlewareSales.validateSale(req, res, next);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, {
        message: 'Sale data must be an array',
      });
    });

    it('Verifica se retorna um erro se algum item da venda não tiver productId', async () => {
      const req = { body: [{ productId: 1, quantity: 2 }, { quantity: 3 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      middlewareSales.validateSale(req, res, next);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"productId" is required' });
    });

    it('Verifica se retorna um erro se algum item da venda não tiver quantity', async () => {
      const req = { body: [{ productId: 1 }, { productId: 2, quantity: 3 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      middlewareSales.validateSale(req, res, next);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"quantity" is required' });
    });

    it('Verifica se retorna um erro se algum item da venda tiver quantity menor ou igual a 0', async () => {
      const req = {
        body: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: -1 },
        ],
      };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      middlewareSales.validateSale(req, res, next);

      sinon.assert.calledWith(res.status, 422);
      sinon.assert.calledWith(res.json, {
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it('Verifica se chama o próximo middleware se todos os dados estiverem corretos', async () => {
      const req = {
        body: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 3 },
        ],
      };
      const res = {};
      const next = sinon.stub();

      middlewareSales.validateSale(req, res, next);

      sinon.assert.calledOnce(next);
    });
  });

  describe('validateSaleQuantity', () => {
    it('Deve retornar um erro se quantity for menor ou igual a 0', async () => {
      const req = { body: { quantity: -1 } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      middlewareSales.validateSaleQuantity(req, res, next);

      sinon.assert.calledWith(res.status, 422);
      sinon.assert.calledWith(res.json, {
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it('Deve retornar um erro se quantity não for definido', async () => {
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();

      middlewareSales.validateSaleQuantity(req, res, next);

      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { message: '"quantity" is required' });
    });

    it('Deve chamar o próximo middleware se quantity estiver definido e maior que 0', async () => {
      const req = { body: { quantity: 2 } };
      const res = {};
      const next = sinon.stub();

      middlewareSales.validateSaleQuantity(req, res, next);

      sinon.assert.calledOnce(next);
    });
  });
});
