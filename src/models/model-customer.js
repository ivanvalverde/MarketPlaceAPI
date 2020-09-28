const mongoose = require('mongoose');
const funcHash = require('../helpers/hash');

const usuarioSchema = new mongoose.Schema({
    nome: String,
    senha: String,
    salto: String,
    email: String,
    cpf: String,
    telefone: String,
    endereco: String

}); 

usuarioSchema.methods.geraSenha = function(pass){
    hashObj = funcHash(pass);
    this.senha = hashObj.storedHash;
    this.salto = hashObj.storedSalt;
}

module.exports = usuarioSchema;