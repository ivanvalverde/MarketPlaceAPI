const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    avaliacao: String,
    preco: Number,
    estoque: Number,
    fornecedor: String,
    foto: String,
    categoria: String

});

const Produto = new mongoose.model('Produto', produtoSchema);

module.exports = Produto;