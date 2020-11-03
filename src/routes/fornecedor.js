const FornecedorController = require('../controllers/fornecedores');

module.exports = (app) => {

    app.get('/fornecedor', FornecedorController.exibeFornecedores());

    app.get('/fornecedor/:_id', FornecedorController.exibeFornecedor());

    app.get('/fornecedor/email/:_email', FornecedorController.exibeFornecedorViaEmail());
    
    app.post('/fornecedor/adiciona', FornecedorController.adicionaFornecedor());
    
    app.delete('/fornecedor/:_id', FornecedorController.deletaFornecedor());
    
    app.put('/fornecedor/altera/:_id', FornecedorController.atualizaFornecedor());
    
}