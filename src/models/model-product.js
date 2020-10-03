const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    avaliacao: String,
    preco: String,
    estoque: Number,
    fornecedor: String

});

const Produto = new mongoose.model('Produto', produtoSchema);

module.exports = Produto;