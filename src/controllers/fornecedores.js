const banco = require("../config/database");
const Fornecedor = require("../models/fornecedor");
const exibirDados = require("../helpers/exibirDados");
const exibirDado = require("../helpers/exibirDado");
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

  static deletaFornecedor() {
    return (req, res) => {
      deletaDados(Fornecedor, req, res);
    };
  }
  static adicionaFornecedor() {
    return (req, res) => {
      const { razaoSocial, cnpj, senha} = req.body;
      const fornecedor = insereDados(Fornecedor, req);
      fornecedor.cnpj = cnpj;
      fornecedor.razaoSocial = razaoSocial;
      fornecedor.setSenha(senha);

      fornecedor.save((err) => {
        if (err) res.send(JSON.stringify({ erro: "Não foi posível salvar." }));
      });

      res.redirect("/fornecedor");
    };
  }

  static atualizaFornecedor() {
    return (req, res) => {
      atualizaDados(Fornecedor, req, res);
    };
  }
}

module.exports = FornecedorController;
