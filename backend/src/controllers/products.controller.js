const products = require('../models/products.model');

const findAll = async (_req, res) => {
  const productsList = await products.findAll();
  if (!productsList) return res.status(404).json({ message: 'Product not found' });
  res.status(200).json(productsList);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const product = await products.findById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(product);
};

module.exports = {
  findAll,
  findById,
};
