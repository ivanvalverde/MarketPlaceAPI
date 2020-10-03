require("dotenv/config");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const Compra = require("../models/model-purchase");
const Cliente = require("../models/model-customer");
const Produto = require("../models/model-product");
const exibirDados = require("../helpers/exibirDados");
const atualizaDados = require("../helpers/atualizaDados");
const insereDados = require("../helpers/insereDados");
const deletaDados = require("../helpers/deletaDados");
const dataAtual = require("../helpers/dataAtual");
const verificaExistencia = require("../helpers/verificaExistencia");
const Usuario = require("../models/model-customer");

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
        res.send(JSON.stringify({ results: elemento }));
      });
    };
  }

  static exibeComprasCliente() {
    return (req, res) => {
      const { idCliente } = req.params;
      Compra.find({ idCliente }, (err, compras) => {
        if (err) res.send(err);
        res.send(compras);
      });
    };
  }

  static cancelaCompra() {
    return async (req, res) => {
      const { _id } = req.params;
      await Compra.update({ _id }, { $set: { dataCancelamento: dataAtual() } });
      res.send("Item Modificado");
    };
  }

  static realizaCompra() {
    return async (req, res) => {
      const { idProduto, idCliente } = req.body;
      verificaExistencia(Cliente, idCliente, res);
      verificaExistencia(Produto, idProduto, res);
      const compra = new Compra({idProduto, idCliente, dataCompra: dataAtual(),dataCancelamento: null});

      compra.save((err) => { if (err) res.send(err); });
      
      res.redirect("/compra");
    };
  }
}

module.exports = CompraController;
