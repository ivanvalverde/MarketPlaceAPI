const mongoose = require('mongoose');
const funcHash = require('../helpers/hash');

const clienteSchema = new mongoose.Schema({
    nome: String,
    senha: String,
    salto: String,
    email: String,
    cpf: String,
    telefone: String,
    endereco: String

}); 

clienteSchema.methods.setSenha = function(pass){
    hashObj = funcHash(pass);
    this.senha = hashObj.storedHash;
    this.salto = hashObj.storedSalt;
};

const Cliente =  new mongoose.model('Cliente', clienteSchema);


module.exports = Cliente;