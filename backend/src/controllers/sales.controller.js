const { salesServices } = require('../services');
const httpErrorMap = require('../utils/mapStatusHTTP');

const findAllSales = async (_req, res) => {
  const allSales = await salesServices.findAllSales();
  if (!allSales) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json({ message: 'Sales not found' });
  }
  return res.status(httpErrorMap.SUCCESSFUL).json(allSales);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.findSalesById(id);

  if (!sale) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json({ message: 'Sale not found' });
  }
  res.status(httpErrorMap.SUCCESSFUL).json(sale);
};

const createSales = async (req, res) => {
  const sales = req.body;
  const newSale = await salesServices.createSales(sales);
  if (newSale.err) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json(newSale.err);
  }
  return res.status(httpErrorMap.CREATED).json(newSale);
};

module.exports = {
  findAllSales,
  findSalesById,
  createSales,
};