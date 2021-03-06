const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const rotasCliente = require('./src/routes/cliente');
const rotasFornecedor = require('./src/routes/fornecedor');
const rotasProdutos = require('./src/routes/produto');
const rotasCompras = require('./src/routes/compra');

app.use(cors())

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

rotasCliente(app);
rotasFornecedor(app);
rotasProdutos(app);
rotasCompras(app);

app.listen(port, () => {
    console.log(`http://localhost:${port}/cliente`);
});

module.exports = app;