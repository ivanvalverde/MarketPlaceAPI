const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    idCliente: String,
    idProduto: String,
    idFornecedor: String,
    dataCompra: Date,
    dataMaxCancelamento: Date

});

const Compra = new mongoose.model('Compra', compraSchema);

module.exports = Compra;