const { salesModel } = require('../models');

const findAllSales = () => salesModel.findAll();

const findSaleById = async (id) => {
  const sale = await salesModel.findById(id);
  return sale || null;
};

const validateProductsInSale = async (sales) => {
  const validationId = await Promise.all(sales.map(async (item) => {
    const productInSale = await salesModel.findById(item.productId);
    return productInSale !== undefined;
  }));
  if (!validationId.every((idProduct) => idProduct)) {
    throw new Error('Product not found');
  }
};

const createSales = async (sales) => {
  await validateProductsInSale(sales);
  return salesModel.create(sales);
};

const updateSales = async (saleId, productId, quantity) => {
  const sale = await findSaleById(saleId);
  if (!sale) throw new Error('Sale not found');
  const product = await salesModel.findById(productId);
  if (!product) throw new Error('Product not found in sale');
  return salesModel.update(saleId, productId, quantity);
};

const deleteSale = async (id) => {
  const sale = await findSaleById(id);
  if (!sale) throw new Error('Sale not found');
  return salesModel.del(id);
};

module.exports = {
  findAllSales,
  findSaleById,
  createSales,
  updateSales,
  deleteSale,
};
