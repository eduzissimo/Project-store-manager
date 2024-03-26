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
const sales = require('../../../src/services/sales.services');
const salesController = require('../../../src/controllers/sales.controller');

describe('Testa o controller de sales', () => {
  afterEach(function () {
    sinon.restore();
  });

  it('Verifica se a função findAllSales retorna todos os produtos', async () => {
    sinon.stub(sales, 'findAllSales').resolves(allSalesMock);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findAllSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica se caso não encontre nenhum produto, retorna erro 404', async () => {
    sinon.stub(sales, 'findAllSales').resolves(null);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findAllSales(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });

  it('Verifica se a função findSalesById retorna produtos pelo id', async () => {
    sinon.stub(sales, 'findSalesById').resolves(salesById);
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findSalesById(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Verifica se caso não encontre nenhum produto pelo id, retorna erro 404', async () => {
    sinon.stub(sales, 'findSalesById').resolves(null);
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.findSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
  });
});