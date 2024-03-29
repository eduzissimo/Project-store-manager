const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.query('SELECT * FROM products');
  return products;
};

const findById = async (id) => {
  const [product] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
  return product.length ? product[0] : null;
};

const create = async (name) => {
  const [{ insertId }] = await connection.query('INSERT INTO products (name) VALUES (?)', [name]);
  return { id: insertId, name };
};

const update = async (id, name) => {
  await connection.query('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return { id: Number(id), name };
};

const del = async (id) => {
  await connection.query('DELETE FROM products WHERE id = ?', [id]);
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  del,
};