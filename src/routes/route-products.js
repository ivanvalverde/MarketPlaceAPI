const ProdutoController = require('../controllers/controller-products');

module.exports = (app) => {

    app.get('/produto', ProdutoController.exibeProdutos());

    app.get('/produto/:_id', ProdutoController.exibeProduto());
    
    app.post('/produto/adiciona', ProdutoController.adicionaProduto());
    
    app.delete('/produto/:_id', ProdutoController.deletaProduto());
    
    app.put('/produto/:_id', ProdutoController.atualizaProduto());
    
}