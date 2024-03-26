const sales = require('../services/sales.services');
const httpErrorMap = require('../utils/mapStatusHTTP');

const findAllSales = async (_req, res) => {
  const allSales = await sales.findAllSales();
  if (!allSales) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json({ message: 'Sales not found' });
  }
  return res.status(httpErrorMap.SUCCESSFUL).json(allSales);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const sale = await sales.findSalesById(id);

  if (!sale) {
    return res
      .status(httpErrorMap.NOT_FOUND)
      .json({ message: 'Sale not found' });
  }
  res.status(httpErrorMap.SUCCESSFUL).json(sale);
};

module.exports = {
  findAllSales,
  findSalesById,
};