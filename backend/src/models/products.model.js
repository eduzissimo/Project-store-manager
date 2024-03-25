const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

  if (product.length === 0) return null;
  return product[0];
};

module.exports = {
  findAll,
  findById,
};