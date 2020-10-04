const FornecedorController = require('../controllers/fornecedores');

module.exports = (app) => {

    app.get('/fornecedor', FornecedorController.exibeFornecedores());

    app.get('/fornecedor/:_id', FornecedorController.exibeFornecedor());
    
    app.post('/fornecedor/adiciona', FornecedorController.adicionaFornecedor());
    
    app.delete('/fornecedor/:_id', FornecedorController.deletaFornecedor());
    
    app.put('/fornecedor/:_id', FornecedorController.atualizaFornecedor());
    
}