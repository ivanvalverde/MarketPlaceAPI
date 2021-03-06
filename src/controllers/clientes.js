const banco = require('../config/database');
const Cliente = require('../models/cliente');
const exibirDados = require('../helpers/exibirDados');
const exibirDado = require('../helpers/exibirDado');
const exibirDadoEmail = require('../helpers/exibirDadoEmail');
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
            exibirDado(Cliente, req, res);
        }
    }

    static exibeClienteViaEmail() {

        return (req, res) => {
            exibirDadoEmail(Cliente, req, res);
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
            const cliente = await insereDados(Cliente, req, res);
            cliente.cpf = cpf;
            await cliente.save((err) => {
                if (err) res.send({ results: err });
            })
            res.send({response: "ok"});
        }
    }

    static atualizaCliente() {

        return (req, res) => {

            atualizaDados(Cliente, req, res);

        }

    }
}

module.exports = ClientesController;