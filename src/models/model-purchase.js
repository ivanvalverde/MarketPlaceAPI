const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    idCliente: String,
    idProduto: String,
    idFornecedor: String,
    dataCompra: Date,
    dataMaxCancelamento: Date

});

module.exports = compraSchema;