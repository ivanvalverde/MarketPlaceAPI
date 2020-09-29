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

  static deletaFornecedor() {

    const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);

    return async (req, res) => {

      await deletaDados(Fornecedor, req, res)
    }
  }

  static addFornecedores() {

    const Fornecedor = new mongoose.model('Fornecedor', fornecedorSchema);

    return async (req, res) => {

      const fornecedor = new Fornecedor({});
      fornecedor.nome = req.body.nome;
      fornecedor.razaoSocial = req.body.razaoSocial;
      await fornecedor.geraSenha(req.body.senha);
      fornecedor.email = req.body.email;
      fornecedor.cnpj = req.body.cnpj;
      fornecedor.telefone = req.body.telefone;
      fornecedor.endereco = req.body.endereco;

      await fornecedor.save((err) => {
        if (err) res.send(err)
      });

      res.redirect('/fornecedor')
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