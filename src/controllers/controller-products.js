require("dotenv/config");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Produto = require("../models/model-product");
const Fornecedor = require("../models/model-provider");
const exibirDados = require("../helpers/exibirDados");
const exibirProduto = require("../helpers/exibirProduto");
const atualizaProduto = require("../helpers/atualizaProduto");
const deletaProdutos = require("../helpers/deletaProdutos");
const insereProdutos = require("../helpers/insereProdutos");

class ProdutoController {
  static exibeProdutos() {
    return (req, res) => {
      exibirDados(Produto, res);
    };
  }

  static exibeProduto() {
    return (req, res) => {
      exibirDado(Produto, req, res);
    };
  }

  static deletaProduto() {
    return async (req, res) => {
      await deletaProdutos(Produto, req, res);
    };
  }

  static adicionaProduto() {
    return async (req, res) => {
      const produto = new Produto( {...req.body} );
      produto.save((err) => { if(err) res.send(JSON.stringify({erro: err}))})
      res.redirect('/produto');
    };
  }

  static atualizaProduto() {
    return (req, res) => {
      atualizaProduto(Produto, req.params.id, req.body, res);
    };
  }
}

module.exports = ProdutoController;
