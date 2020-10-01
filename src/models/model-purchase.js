const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    idCliente: String,
    idProduto: String,
    dataCompra: Date,
    dataCancelamento: Date
});

module.exports = compraSchema;