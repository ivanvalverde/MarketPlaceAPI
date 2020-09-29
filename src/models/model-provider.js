const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
    nome: String,
    razaoSocial: String,
    cnpj: String,
    telefone: String,
    email: String,
    endereco: String,
    salto: String,
    senha: String

});

const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);

module.exports = Fornecedor;