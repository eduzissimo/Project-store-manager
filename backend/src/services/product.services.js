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

const updateProduct = async (id, name) => {
  const productFound = await productsModel.findById(id);
  if (!productFound) throw new Error('Product not found');
  const updatedProduct = await productsModel.update(id, name);
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const productFound = await productsModel.findById(id);
  if (!productFound) throw new Error('Product not found');
  await productsModel.del(id);
};

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};