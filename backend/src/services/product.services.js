const { productsModel } = require('../models');

const findAllProducts = () => productsModel.findAll();

const findProductById = async (id) => {
  const productFound = await productsModel.findById(id);
  return Array.isArray(productFound) && productFound.length > 0 ? productFound[0] : productFound;
};

const createProduct = (name) => productsModel.create(name);

const updateProduct = async (id, name) => {
  const productFound = await findProductById(id);
  if (!productFound) throw new Error('Product not found');
  return productsModel.update(id, name);
};

const deleteProduct = async (id) => {
  const productFound = await findProductById(id);
  if (!productFound) throw new Error('Product not found');
  await productsModel.del(id);
};

module.exports = {
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
