const ClienteController = require('../controllers/clientes');

module.exports = (app) => {

    app.get('/cliente', ClienteController.exibeClientes());

    app.get('/cliente/:_id', ClienteController.exibeCliente());

    app.get('/cliente/email/:email', ClienteController.exibeClienteViaEmail());
    
    app.post('/cliente/adiciona', ClienteController.adicionaCliente());
    
    app.delete('/cliente/:_id', ClienteController.deletaCliente());
    
    app.put('/cliente/altera/:_id', ClienteController.atualizaCliente());
    
}