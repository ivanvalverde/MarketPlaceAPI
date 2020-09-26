const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: String,
    senha: String,
    email: String,
    cpf: String,
    telefone: String,
    endereco: String

});

module.exports = usuarioSchema;