const { productsServices } = require('../services');
const httpErrorMap = require('../utils/mapStatusHTTP');

const findAllProducts = async (_req, res) => {
  const productsList = await productsServices.findAllProducts();
  if (!productsList) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json({ message: 'Products not found' });
  }
  res.status(httpErrorMap.SUCCESSFUL).json(productsList);
};

const findProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productsServices.findProductsById(id);

  if (!product) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json({ message: 'Product not found' });
  }
  return res.status(httpErrorMap.SUCCESSFUL).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsServices.createProduct(name);
  res.status(httpErrorMap.CREATED).json(newProduct);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedProduct = await productsServices.updateProduct(id, name);
    return res.status(httpErrorMap.SUCCESSFUL).json(updatedProduct);
  } catch (error) {
    return res.status(httpErrorMap.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
  updateProduct,
};
