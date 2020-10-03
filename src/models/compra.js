const mongoose = require('mongoose');

const compraSchema = new mongoose.Schema({
    idCliente: String,
    idProduto: String,
    dataCompra: Date,
    dataCancelamento: Date
});

const Compra = new mongoose.model('Compra', compraSchema);

module.exports = Compra;