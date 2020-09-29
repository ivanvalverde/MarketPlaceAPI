require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const fornecedorSchema = require('../models/model-provider');
const exibirDados = require('../helpers/exibirDados');
const exibirDado = require('../helpers/exibirDado');
const atualizaDados = require('../helpers/atualizaDados');
const insereDados = require('../helpers/insereDados');
const deletaDados = require('../helpers/deletaDados');


class FornecedorController {

  static exibeFornecedores() {

    const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);

    return (req, res) => {

      exibirDados(Fornecedor, res);

    }
  }

  static exibeFornecedor() {

    const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);

    return (req, res) => {

      exibirDado(Fornecedor, req, res);

    }
  }

  static deletaUsuarios() {

    const Usuario = new mongoose.model('Usuario', usuarioSchema);

    return async (req, res) => {

      await deletaDados(Usuario, req, res)
    }
  }

  static addUsuarios() {

    const Usuario = new mongoose.model('Usuario', usuarioSchema);

    return async (req, res) => {

      await insereDados(Usuario, req, res);
    }
  }

  static atualizaUsuarios() {

    const Usuario = new mongoose.model('Usuario', usuarioSchema);

    return (req, res) => {

      atualizaDados(Usuario, req.params.id, req.body, res);

    }

  }
}

module.exports = FornecedorController;