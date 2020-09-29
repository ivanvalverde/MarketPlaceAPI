const FornecedorController = require('../controllers/controller-providers');

module.exports = (app) => {

    app.get('/fornecedor', FornecedorController.exibeFornecedores());

    app.get('/fornecedor/:email', FornecedorController.exibeFornecedor());
    
    app.post('/fornecedor/adiciona', FornecedorController.addFornecedores());
    
    app.delete('/fornecedor/:id', ()=>{});
    
    app.put('/fornecedor/:id', ()=>{});
    
}