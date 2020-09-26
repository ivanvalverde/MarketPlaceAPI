const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    avaliacao: String,
    preco: Number,
    estoque: Number,
    fornecedor: String

});

module.exports = produtoSchema;