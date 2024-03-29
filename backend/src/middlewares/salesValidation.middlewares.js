const validateSale = (req, res, next) => {
  const sale = req.body;
  if (!Array.isArray(sale)) {
    return res.status(400).json({ message: 'Sale data must be an array' });
  }

  const productIdValidation = sale.every((item) => item.productId);
  if (!productIdValidation) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const quantityValidation1 = sale.every((item) => item.quantity !== undefined);
  if (!quantityValidation1) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const quantityValidation2 = sale.every((item) => item.quantity > 0);
  if (!quantityValidation2) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const validateSaleQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (quantity === undefined) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

module.exports = {
  validateSale,
  validateSaleQuantity,
};