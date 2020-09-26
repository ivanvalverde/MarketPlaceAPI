const credentials = require('../helpers/atlasAcessCredentials');
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${credentials.user}:${credentials.password}@cluster0.pxbfi.gcp.mongodb.net/${credentials.clusterName}?retryWrites=true&w=majority`, {useNewUrlParser: true});
const usuarioSchema = require('../models/model-customer');
const produtoSchema = require('../models/model-product');
const fornecedorSchema = require('../models/model-provider');
const compraSchema = require('../models/model-purchase');
const db = mongoose.connection;

db.on('open', ()=>{

    const Usuario = new mongoose.model('Usuario', usuarioSchema);
    const Produto = new mongoose.model('Produto', produtoSchema);
    const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);
    const Compra = new mongoose.model('Compra', compraSchema);

});