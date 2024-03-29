const express = require('express');
const { productsRoutes, salesRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

module.exports = app;
