const { salesModel } = require('../models');

const findAllSales = async () => salesModel.findAll();

const findSalesById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return null;
  return sale;
};

const createSales = async (sales) => {
  const validationId = await Promise.all(sales.map(async (sale) => {
    const productsInSale = await salesModel.findById(sale.productId);
    return productsInSale !== null;
  }));
  if (!validationId.every((id) => id)) {
    return { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  return salesModel.create(sales);
};

module.exports = {
  findAllSales,
  findSalesById,
  createSales,
};