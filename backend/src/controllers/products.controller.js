const { productsServices } = require('../services');
const httpErrorMap = require('../utils/mapStatusHTTP');

const findAllProducts = async (_req, res) => {
  try {
    const productsList = await productsServices.findAllProducts();
    if (!productsList) {
      return res.status(httpErrorMap.NOT_FOUND).json({ message: 'Products not found' });
    }
    res.status(httpErrorMap.SUCCESSFUL).json(productsList);
  } catch (error) {
    res.status(httpErrorMap.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.findProductById(id);

    if (!product) {
      return res.status(httpErrorMap.NOT_FOUND).json({ message: 'Product not found' });
    }
    res.status(httpErrorMap.SUCCESSFUL).json(product);
  } catch (error) {
    res.status(httpErrorMap.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = await productsServices.createProduct(name);
    res.status(httpErrorMap.CREATED).json(newProduct);
  } catch (error) {
    res.status(httpErrorMap.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedProduct = await productsServices.updateProduct(id, name);
    res.status(httpErrorMap.SUCCESSFUL).json(updatedProduct);
  } catch (error) {
    res.status(httpErrorMap.NOT_FOUND).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productsServices.deleteProduct(id);
    res.status(httpErrorMap.NO_CONTENT).end();
  } catch (error) {
    res.status(httpErrorMap.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  findAllProducts,
  findProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
};