const mongoose = require('mongoose');

const fornecedorSchema = new mongoose.Schema({
    nome: String,
    razaoSocial: String,
    cnpj: String,
    telefone: String,
    email: String,
    endereco: String,
    senha: String

});

module.exports = fornecedorSchema;