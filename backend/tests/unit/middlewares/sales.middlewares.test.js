const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;
const { expect } = chai;

const middlewareSales = require('../../../src/middlewares/salesValidation.middlewares');

describe('Testando o middleware de validação de criação de vendas', function () {
  describe('Testando a requisição', function () {
    const req = {
      body: [
        {
          productId: 1,
          quantity: 2,
        },
        {
          productId: 2,
          quantity: 5,
        },
      ],
    };
    const wrongReqQuantity = {
      body: [
        {
          productId: 1,
          quantity: 1,
        },
        {
          productId: 2,
        },
      ],
    };
    const wrongReqProductId = {
      body: [
        {
          productId: 1,
          quantity: 2,
        },
        {
          quantity: 5,
        },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();
    afterEach(function () {
      sinon.resetHistory();
    });

    it('Verifica se chama next sem erros', () => {
      middlewareSales.validateSale(req, res, next);
      expect(next).to.have.been.calledWith();
    });

    it('Verifica se chama o next com erro por não ter quantidade', () => {
      const response = middlewareSales.validateSaleQuantity(wrongReqQuantity, res, next);
      expect(response).to.deep.equal(
        res.status(400).json({ message: '"quantity" is required' }),
      );
    });

    it('Verifica se o next chama um erro por não ter productId', () => {
      const response = middlewareSales.validateSale(wrongReqProductId, res, next);
      expect(response).to.deep.equal(
        res.status(400).json({ message: '"productId" is required' }),
      );
    });

    it('Verifica se o next chama um erro por ter quantidade menor que 1', () => {
      const response = middlewareSales.validateSaleQuantity(wrongReqQuantity, res, next);
      expect(response).to.deep.equal(
        res.status(422).json({ message: '"quantity" must be greater than or equal to 1' }),
      );
    });
  });
});
