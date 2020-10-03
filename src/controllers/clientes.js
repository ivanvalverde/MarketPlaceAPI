const banco = require('../config/database');
const Cliente = require('../models/cliente');
const exibirDados = require('../helpers/exibirDados');
const exibirDado = require('../helpers/exibirDado');
const atualizaDados = require('../helpers/atualizaDados');
const insereDados = require('../helpers/insereDados');
const deletaDados = require('../helpers/deletaDados');



class ClientesController {

    static exibeClientes() {

        return (req, res) => {
            exibirDados(Cliente, res);
        }
    }

    static exibeCliente() {

        return (req, res) => {
            exibirDado(Cliente, req ,res);
        }
    }

    static deletaCliente() {
    
        return (req, res) => {
            deletaDados(Cliente, req, res)
        }
    }

    static adicionaCliente() {

        return async (req, res) => {
            const { cpf } = req.body;
            const cliente = insereDados(Cliente, req, res);
            cliente.cpf = cpf;
            await cliente.save((err) => {
                if(err) res.send(JSON.stringify({results: err}))
            })
            res.redirect('/cliente')
        }
    }

    static atualizaCliente(){

        return (req, res)=>{

            atualizaDados(Cliente, req, res);

        }

    }
}

module.exports = ClientesController;