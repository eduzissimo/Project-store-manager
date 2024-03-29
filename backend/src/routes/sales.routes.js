const salesRoutes = require('express').Router();
const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/salesValidation.middlewares');

salesRoutes.get('/', salesController.findAllSales);
salesRoutes.get('/:id', salesController.findSalesById);
salesRoutes.post('/', validateSale, salesController.createSales);

module.exports = salesRoutes;