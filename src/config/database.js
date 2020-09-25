const credentials = require('../helpers/atlasAcessCredentials');
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${credentials.user}:${credentials.password}@cluster0.pxbfi.gcp.mongodb.net/${credentials.clusterName}?retryWrites=true&w=majority`, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('open', ()=>{

    const usuarioSchema = new mongoose.Schema({
        nome: String,
        senha: String,
        email: String,
        cpf: String,
        telefone: String,
        endereco: String

    });

    const produtoSchema = new mongoose.Schema({
        nome: String,
        descricao: String,
        avaliacao: String,
        preco: Number,
        estoque: Number,
        fornecedor: String

    });

    const fornecedorSchema = new mongoose.Schema({
        nome: String,
        razaoSocial: String,
        cnpj: String,
        telefone: String,
        endereco: String

    });

    const compraSchema = new mongoose.Schema({
        idCliente: String,
        idProduto: String,
        idFornecedor: String

    });

    const Usuario = new mongoose.model('Usuario', usuarioSchema);
    const Produto = new mongoose.model('Produto', produtoSchema);
    const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);
    const Compra = new mongoose.model('Compra', compraSchema);

});