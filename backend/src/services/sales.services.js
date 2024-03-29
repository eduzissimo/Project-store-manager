const { salesModel } = require('../models');

const findAllSales = async () => salesModel.findAll();

const findSalesById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return null;
  return sale;
};

const createSales = async (sales) => {
  const validationId = await Promise.all(sales.map(async (item) => {
    const productsInSale = await salesModel.findById(item.productId);
    return productsInSale !== undefined;
  }));
  if (validationId.every((idProduct) => idProduct) === false) {
    throw new Error('Product not found');
  }
  const newSale = await salesModel.create(sales);
  return newSale;
};

const updateSales = async (saleId, productId, quantity) => {
  const sale = await salesModel.findById(saleId);
  if (!sale) throw new Error('Sale not found');
  const product = await salesModel.findById(productId);
  if (!product) throw new Error('Product not found');
  return salesModel.update(saleId, productId, quantity);
};

module.exports = {
  findAllSales,
  findSalesById,
  createSales,
  updateSales,
};