const ProdutoController = require('../controllers/controller-products');

module.exports = (app) => {

    app.get('/produto', ProdutoController.exibeProdutos());

    app.get('/produto/:nome', ProdutoController.exibeProduto());
    
    app.post('/produto/adiciona', ProdutoController.addProdutos());
    
    app.delete('/produto/:id', ProdutoController.deletaProdutos());
    
    app.put('/produto/:id', ProdutoController.atualizaProdutos());
    
}