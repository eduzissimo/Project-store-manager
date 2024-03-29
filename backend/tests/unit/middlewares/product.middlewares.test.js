const chai = require('chai');
const sinon = require('sinon');
const mocha = require('mocha');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.use(sinonChai);

const { describe, it } = mocha;
const { expect } = chai;

const middlewareProducts = require('../../../src/middlewares/productValidation.middleware');

describe('Testando o middleware de validação de produtos', function () {
  const req = {
    body: {
      name: 'Produto 1',
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };
  const next = sinon.stub().returns();
  afterEach(function () {
    sinon.resetHistory();
  });

  it('Verifica se o next é chamado sem erros', () => {
    middlewareProducts.validateProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Verifica se retorna um erro quando não tem o campo name', () => {
    req.body.name = '';
    middlewareProducts.validateProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.status().json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('Verifica se retorna erro quando o nome é curto demais', () => {
    req.body.name = 'Pro';
    middlewareProducts.validateProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
  });
});