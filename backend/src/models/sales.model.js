const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const query = `
  SELECT  sale_id, sales.date, product_id, quantity
  FROM sales_products
  JOIN sales ON sales.id = sales_products.sale_id
  ORDER BY sale_id, product_id;
  `;
  const [sales] = await connection.query(query);
  return camelize(sales);
};

const findById = async (id) => {
  const query = `
  SELECT sales.date, product_id, quantity
  FROM sales_products
  JOIN sales ON sales.id = sales_products.sale_id
  WHERE sales.id = ?;
  `;
  const [sale] = await connection.query(query, [id]);
  if (sale.length === 0) return null;
  return camelize(sale);
};

const create = async (sales) => {
  const tableQuery = 'INSERT INTO sales (date) VALUES (?)';
  const [{ insertId: id }] = await connection.query(tableQuery, [new Date()]);
  const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';
  await Promise.all(sales.map(async (sale) => {
    const { productId, quantity } = sale;
    await connection.query(query, [id, productId, quantity]);
  }));
  return {
    id,
    itemsSold: [...sales,
    ] };
};

const update = async (saleId, productId, quantity) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  await connection.query(query, [quantity, saleId, productId]);
  const updateDate = new Date();
  return {
    updateDate,
    saleId: Number(saleId),
    productId: Number(productId),
    quantity: Number(quantity),
  };
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};