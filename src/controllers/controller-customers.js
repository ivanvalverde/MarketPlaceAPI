require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
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

    static deletaUsuarios() {
    

        return async (req, res) => {
            
            await deletaDados(Usuario, req, res)
        }
    }

    static addUsuarios() {

        return async (req, res) => {

            await insereDados(Usuario, req, res);
        }
    }

    static atualizaUsuarios(){

        return (req, res)=>{

            atualizaDados(Usuario, req.params.id, req.body, res);

        }

    }
}

module.exports = UsuarioController;