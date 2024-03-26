const salesRoutes = require('express').Router();
const salesController = require('../controllers/sales.controller');

salesRoutes.get('/', salesController.findAllSales);
salesRoutes.get('/:id', salesController.findSalesById);

module.exports = salesRoutes;