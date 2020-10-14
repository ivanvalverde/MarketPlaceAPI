const mongoose = require('mongoose');
const funcHash = require('../helpers/hash');


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

fornecedorSchema.methods.setSenha = function(pass){
    hashObj = funcHash(pass);
    this.senha = hashObj.storedHash;
    this.salto = hashObj.storedSalt;
};

const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);

module.exports = Fornecedor;