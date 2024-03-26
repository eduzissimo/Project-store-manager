const productsRoutes = require('express').Router();
const { productsController } = require('../controllers');

productsRoutes.get('/', productsController.findAllProducts);
productsRoutes.get('/:id', productsController.findProductsById);
productsRoutes.post('/', productsController.createProduct);

module.exports = productsRoutes;