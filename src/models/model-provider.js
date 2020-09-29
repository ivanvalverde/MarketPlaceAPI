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

fornecedorSchema.methods.geraSenha = function(pass){
    hashObj = funcHash(pass);
    this.senha = hashObj.storedHash;
    this.salto = hashObj.storedSalt;
}

module.exports = fornecedorSchema;