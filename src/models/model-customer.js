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

usuarioSchema.methods.setSenha = function(pass){
    hashObj = funcHash(pass);
    this.senha = hashObj.storedHash;
    this.salto = hashObj.storedSalt;
};

const Usuario =  new mongoose.model('Usuario', usuarioSchema);


module.exports = Usuario;