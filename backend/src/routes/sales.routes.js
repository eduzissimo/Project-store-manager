const salesRoutes = require('express').Router();
const { salesController } = require('../controllers');

salesRoutes.get('/', salesController.findAllSales);
salesRoutes.get('/:id', salesController.findSalesById);

module.exports = salesRoutes;