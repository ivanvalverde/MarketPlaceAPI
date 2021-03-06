const banco = require("../config/database");
const Fornecedor = require("../models/fornecedor");
const exibirDados = require("../helpers/exibirDados");
const exibirDado = require("../helpers/exibirDado");
const exibirDadoEmail = require('../helpers/exibirDadoEmail');
const atualizaDados = require("../helpers/atualizaDados");
const insereDados = require("../helpers/insereDados");
const deletaDados = require("../helpers/deletaDados");

class FornecedorController {
  static exibeFornecedores() {
    return (req, res) => {
      exibirDados(Fornecedor, res);
    };
  }

  static exibeFornecedor() {
    return (req, res) => {
      exibirDado(Fornecedor, req, res);
    };
  }

  static exibeFornecedorViaEmail() {

    return (req, res) => {
      exibirDadoEmail(Fornecedor, req, res);
    }
  }

  static deletaFornecedor() {
    return (req, res) => {
      deletaDados(Fornecedor, req, res);
    };
  }
  static adicionaFornecedor() {
    return async (req, res) => {
      const { razaoSocial, cnpj} = req.body;
      const fornecedor = await insereDados(Fornecedor, req);
      fornecedor.cnpj = cnpj;
      fornecedor.razaoSocial = razaoSocial;

      await fornecedor.save((err) => {
        if (err) res.send({ erro: err });
      });

      res.send({response: "ok"});
    };
  }

  static atualizaFornecedor() {
    return (req, res) => {
      atualizaDados(Fornecedor, req, res);
    };
  }
}

module.exports = FornecedorController;
