const ProdutoController = require('../controllers/produtos');

module.exports = (app) => {

    app.get('/produto', ProdutoController.exibeProdutos());

    app.get('/produto/search/:content', ProdutoController.buscaProdutos());

    app.get('/produto/:_id', ProdutoController.exibeProduto());
    
    app.post('/produto/adiciona', ProdutoController.adicionaProduto());
    
    app.delete('/produto/:_id', ProdutoController.deletaProduto());
    
    app.put('/produto/altera/:_id', ProdutoController.atualizaProduto());
    
}