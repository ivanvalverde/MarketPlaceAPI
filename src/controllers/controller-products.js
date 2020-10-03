require("dotenv/config");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Produto = require("../models/model-product");
const Fornecedor = require("../models/model-provider");
const exibirDados = require("../helpers/exibirDados");
const atualizaProduto = require("../helpers/atualizaProduto");
const deletaDados = require("../helpers/deletaDados");

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
    return (req, res) => {
      deletaDados(Produto, req, res);
    };
  }

  static adicionaProduto() {
    return async (req, res) => {
      const produto = new Produto( {...req.body} );
      await Fornecedor.findById(req.body.fornecedor, (err, fornecedor) => {
        if(err) res.send(JSON.stringify({ erro: "Fornecedor não existe"}))
      })
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
