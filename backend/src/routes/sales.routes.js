const salesRoutes = require('express').Router();
const { salesController } = require('../controllers');
const { validateSale } = require('../middlewares/salesValidation.middlewares');

salesRoutes.get('/', salesController.findAllSales);
salesRoutes.get('/:id', salesController.findSalesById);
salesRoutes.post('/', validateSale, salesController.createSales);
salesRoutes.delete('/:id', salesController.deleteSales);

module.exports = salesRoutes;