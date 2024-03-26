const { productsModel } = require('../models');

const findAllProducts = async () => productsModel.findAll();

const findProductsById = async (id) => {
  const productFound = await productsModel.findById(id);

  return productFound || null;
};

const createProduct = async (name) => productsModel.create(name);

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
};