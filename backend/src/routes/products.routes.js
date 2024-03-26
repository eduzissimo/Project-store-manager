const productsRoutes = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares/validation.middleware');

productsRoutes.get('/', productsController.findAllProducts);
productsRoutes.get('/:id', productsController.findProductsById);
productsRoutes.post('/', validateProduct, productsController.createProduct);

module.exports = productsRoutes;