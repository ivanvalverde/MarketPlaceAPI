const FornecedorController = require('../controllers/controller-providers');

module.exports = (app) => {

    app.get('/fornecedor', FornecedorController.exibeFornecedores());
    
    app.post('/fornecedor', ()=>{});
    
    app.delete('/fornecedor/:id', ()=>{});
    
    app.put('/fornecedor/:id', ()=>{});
    
}