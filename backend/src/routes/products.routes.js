const productsRoutes = require('express').Router();
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares/productValidation.middleware');

productsRoutes.get('/', productsController.findAllProducts);
productsRoutes.get('/:id', productsController.findProductsById);
productsRoutes.post('/', validateProduct, productsController.createProduct);
productsRoutes.put('/:id', validateProduct, productsController.updateProduct);

module.exports = productsRoutes;