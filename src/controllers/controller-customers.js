const banco = require('../config/database');
const Usuario = require('../models/model-customer');
const exibirDados = require('../helpers/exibirDados');
const exibirDado = require('../helpers/exibirDado');
const atualizaDados = require('../helpers/atualizaDados');
const insereDados = require('../helpers/insereDados');
const deletaDados = require('../helpers/deletaDados');



class UsuarioController {

    static exibeUsuarios() {

        return (req, res) => {
            exibirDados(Usuario, res);
        }
    }

    static exibeUsuario() {

        return (req, res) => {
            exibirDado(Usuario, req ,res);
        }
    }

    static deletaUsuario() {
    
        return (req, res) => {
            deletaDados(Usuario, req, res)
        }
    }

    static adicionaUsuario() {

        return async (req, res) => {
            const { cpf } = req.body;
            const usuario = insereDados(Usuario, req, res);
            usuario.cpf = cpf;
            await usuario.save((err) => {
                if(err) res.send(JSON.stringify({results: err}))
            })
            res.redirect('/usuario')
        }
    }

    static atualizaUsuarios(){

        return (req, res)=>{

            atualizaDados(Usuario, req, res);

        }

    }
}

module.exports = UsuarioController;