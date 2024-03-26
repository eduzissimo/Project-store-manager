const sales = require('../models/sales.model');

const findAllSales = async () => sales.findAll();

const findSalesById = async (id) => {
  const sale = await sales.findById(id);

  if (!sale) return null;
  return sale;
};

module.exports = {
  findAllSales,
  findSalesById,
};