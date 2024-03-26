const { salesModel } = require('../models');

const findAllSales = async () => salesModel.findAll();

const findSalesById = async (id) => {
  const sale = await salesModel.findById(id);

  if (!sale) return null;
  return sale;
};

module.exports = {
  findAllSales,
  findSalesById,
};