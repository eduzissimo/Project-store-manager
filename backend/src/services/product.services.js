const { productsModel } = require('../models');

const findAllProducts = async () => productsModel.findAll();

const findProductsById = async (id) => {
  const productFound = await productsModel.findById(id);
  if (Array.isArray(productFound) && productFound.length > 0) {
    return productFound[0];
  }
  return productFound;
};

const createProduct = async (name) => productsModel.create(name);

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
};