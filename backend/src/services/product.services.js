const product = require('../models/products.model');

const findAllProducts = async () => product.findAll();

const findProductsById = async (id) => {
  const productFound = await product.findById(id);

  return productFound || null;
};

const createProduct = async (name) => product.create(name);

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
};