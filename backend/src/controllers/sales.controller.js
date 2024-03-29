const { salesServices } = require('../services');
const httpErrorMap = require('../utils/mapStatusHTTP');

const findAllSales = async (_req, res) => {
  try {
    const allSales = await salesServices.findAllSales();
    if (!allSales) {
      return res.status(httpErrorMap.NOT_FOUND).json({ message: 'Sales not found' });
    }
    return res.status(httpErrorMap.SUCCESSFUL).json(allSales);
  } catch (error) {
    res.status(httpErrorMap.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const findSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.findSaleById(id);
    if (!sale) {
      return res.status(httpErrorMap.NOT_FOUND).json({ message: 'Sale not found' });
    }
    res.status(httpErrorMap.SUCCESSFUL).json(sale);
  } catch (error) {
    res.status(httpErrorMap.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const createSales = async (req, res) => {
  try {
    const sale = req.body;
    const newSale = await salesServices.createSales(sale);
    res.status(httpErrorMap.CREATED).json(newSale);
  } catch (error) {
    res.status(httpErrorMap.NOT_FOUND).json({ message: 'Product not found' });
  }
};

const updateSales = async (req, res) => {
  try {
    const { saleId, productId } = req.params;
    const { quantity } = req.body;
    const updatedSale = await salesServices.updateSales(saleId, productId, quantity);
    res.status(httpErrorMap.SUCCESSFUL).json(updatedSale);
  } catch (error) {
    res.status(httpErrorMap.NOT_FOUND).json({ message: error.message });
  }
};

const deleteSales = async (req, res) => {
  try {
    const { id } = req.params;
    await salesServices.deleteSales(id);
    res.status(httpErrorMap.NO_CONTENT).end();
  } catch (error) {
    res.status(httpErrorMap.NOT_FOUND).json({ message: error.message });
  }
};

module.exports = {
  findAllSales,
  findSalesById,
  createSales,
  updateSales,
  deleteSales,
};