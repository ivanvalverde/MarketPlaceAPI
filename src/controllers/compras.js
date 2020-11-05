const banco = require("../config/database");
const Compra = require("../models/compra");
const Cliente = require("../models/cliente");
const Produto = require("../models/produto");
const exibirDados = require("../helpers/exibirDados");
const dataAtual = require("../helpers/dataAtual");
const verificaExistencia = require("../helpers/verificaExistencia");
const Fornecedor = require("../models/fornecedor");

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
        res.send({ results: compras });
      });
    };
  }

  static exibeComprasCliente() {
    return (req, res) => {
      const { idCliente } = req.params;
      Compra.find({ idCliente }, (err, compras) => {
        if (err) res.send(JSON.stringify({ results: err }));
        res.send({ results: compras });
      });
    };
  }

  static exibeComprasFornecedor() {
    return (req, res) => {
      const { idFornecedor } = req.params;
      Fornecedor.findOne({ _id: idFornecedor }, (err, prov) => {
        if (err) {
          res.send({ results: err });
        } else {
          Produto.find({ fornecedor: prov._id }, (err, prod) => {
            if (err) {
              res.send({ results: err });
            } else {
              res.send({ results: prod })
            }
          });
        }
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
        res.send({ results: compra });
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
        Produto.findById({ _id: idProduto }, (err, produto) => {
          produto.estoque -= 1;
          produto.save();
        });
      });

      res.redirect("/compra");
    };
  }
}

module.exports = CompraController;
