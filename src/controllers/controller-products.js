require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const produtoSchema = require('../models/model-product');
const fornecedorSchema = require('../models/model-provider');
const exibirDados = require('../helpers/exibirDados');
const exibirProduto = require('../helpers/exibirProduto');
const atualizaProduto = require('../helpers/atualizaProduto');
const deletaProdutos = require('../helpers/deletaProdutos');
const insereProdutos = require('../helpers/insereProdutos');



class ProdutoController {

    static exibeProdutos() {

        const Produto = new mongoose.model('Produto', produtoSchema);

        return (req, res) => {

            exibirDados(Produto, res);

        }
    }

    static exibeProduto() {

        const Produto = new mongoose.model('Produto', produtoSchema);

        return (req, res) => {

            exibirProduto(Produto, req ,res);

        }
    }

    static deletaProdutos() {
        
        const Produto = new mongoose.model('Produto', produtoSchema);

        return async (req, res) => {
            
            await deletaProdutos(Produto, req, res)
        }
    }

    static addProdutos() {

        const Produto = new mongoose.model('Produto', produtoSchema);
        const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);


        return async (req, res) => {

            await insereProdutos(Produto, Fornecedor, req, res);
        }
    }

    static atualizaProdutos(){

        const Produto = new mongoose.model('Produto', produtoSchema);

        return (req, res)=>{

            atualizaProduto(Produto, req.params.id, req.body, res);

        }

    }


}

module.exports = ProdutoController;