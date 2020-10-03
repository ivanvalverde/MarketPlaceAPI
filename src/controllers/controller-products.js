require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const Produto = require('../models/model-product');
const Fornecedor = require('../models/model-provider');
const exibirDados = require('../helpers/exibirDados');
const exibirProduto = require('../helpers/exibirProduto');
const atualizaProduto = require('../helpers/atualizaProduto');
const deletaProdutos = require('../helpers/deletaProdutos');
const insereProdutos = require('../helpers/insereProdutos');



class ProdutoController {

    static exibeProdutos() {

        return (req, res) => {
            exibirDados(Produto, res);

        }
    }

    static exibeProduto() {

        return (req, res) => {
            exibirProduto(Produto, req ,res);

        }
    }

    static deletaProdutos() {
    

        return async (req, res) => {            
            await deletaProdutos(Produto, req, res)
        }
    }

    static addProdutos() {

        return async (req, res) => {
            await insereProdutos(Produto, Fornecedor, req, res);
        }
    }

    static atualizaProdutos(){

        return (req, res) => {
            atualizaProduto(Produto, req.params.id, req.body, res);
        }

    }
}

module.exports = ProdutoController;