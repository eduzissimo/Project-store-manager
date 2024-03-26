const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    if (error.details[0].type === 'string.min') {
      return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    }
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = {
  validateProduct,
};