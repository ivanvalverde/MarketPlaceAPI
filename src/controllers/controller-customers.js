require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const usuarioSchema = require('../models/model-customer');
const exibirDados = require('../helpers/exibirDados');
const atualizaDados = require('../helpers/atualizaDados');
const insereDados = require('../helpers/insereDados');
const deletaDados = require('../helpers/deletaDados');


class UsuarioController {

    static exibeUsuarios() {

        const Usuario = new mongoose.model('Usuario', usuarioSchema);

        return (req, res) => {

            exibirDados(Usuario, res);

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

    static atualizaUsuarios(){

        const Usuario = new mongoose.model('Usuario', usuarioSchema);

        return (req, res)=>{

            atualizaDados(Usuario, req.params.id, req.body, res);

        }

    }
}

module.exports = UsuarioController;