const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.query('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);

  if (product.length === 0) return null;
  return product[0];
};

const create = async (name) => {
  const [product] = await connection.query('INSERT INTO products (name) VALUES (?)', [name]);
  const newProductId = product.insertId;
  return { id: newProductId, name };
};

module.exports = {
  findAll,
  findById,
  create,
};