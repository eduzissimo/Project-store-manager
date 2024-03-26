const productsRoutes = require('express').Router();
const productsController = require('../controllers/products.controller');

productsRoutes.get('/', productsController.findAllProducts);
productsRoutes.get('/:id', productsController.findProductsById);
productsRoutes.post('/', productsController.createProduct);

module.exports = productsRoutes;