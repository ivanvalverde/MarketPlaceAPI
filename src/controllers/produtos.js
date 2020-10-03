const banco = require('../config/database');
const Produto = require("../models/produto");
const Fornecedor = require("../models/fornecedor");
const exibirDados = require("../helpers/exibirDados");
const exibirDado = require("../helpers/exibirDado");
const deletaDados = require("../helpers/deletaDados");
const atualizaDados = require("../helpers/atualizaDados");

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
      atualizaDados(Produto, req, res);
    };
  }
}

module.exports = ProdutoController;
