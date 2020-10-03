const banco = require('../config/database');

const Compra = require("../models/model-purchase");
const Cliente = require("../models/model-customer");
const Produto = require("../models/model-product");
const exibirDados = require("../helpers/exibirDados");
const dataAtual = require("../helpers/dataAtual");
const verificaExistencia = require("../helpers/verificaExistencia");

class CompraController {
  static exibeCompras() {
    return (req, res) => {
      exibirDados(Compra, res);
    };
  }

  static exibeComprasProduto() {
    return (req, res) => {
      const { idProduto } = req.params;
      Compra.find({ idProduto }, (err, compras) => {
        if (err) res.send(JSON.stringify({ results: err }));
        res.send(JSON.stringify({ results: compras }));
      });
    };
  }

  static exibeComprasCliente() {
    return (req, res) => {
      const { idCliente } = req.params;
      Compra.find({ idCliente }, (err, compras) => {
        if (err) res.send(JSON.stringify({ results: err }));
        res.send(JSON.stringify({ results: compras }));
      });
    };
  }

  static cancelaCompra() {
    return async (req, res) => {
      const { _id } = req.params;
      await Compra.findById({ _id }, async (err, compra) => {
        if (err) {
          res.send(JSON.stringify({ erro: "Compra não cancelada" }));
          return;
        }
        if (compra.dataCancelamento) {
          res.status(404).send(JSON.stringify({ erro: "Compra já cancelada" }));
          return;
        }
        compra.dataCancelamento = dataAtual();
        await compra.save((err) => {
          if (err) res.send(JSON.stringify({ erro: "Compra não cancelada" }));
        });
        res.send(JSON.stringify({ results: compra }));
      });
    };
  }

  static realizaCompra() {
    return async (req, res) => {
      const { idProduto, idCliente } = req.body;
      verificaExistencia(Cliente, idCliente, res);
      verificaExistencia(Produto, idProduto, res);
      const compra = new Compra({
        idProduto,
        idCliente,
        dataCompra: dataAtual(),
        dataCancelamento: null,
      });
      compra.save((err) => {
        if (err) res.send(JSON.stringify({ erro: "Compra não finalizada" }));
      });

      res.redirect("/compra");
    };
  }
}

module.exports = CompraController;
