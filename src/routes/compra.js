const CompraController = require("../controllers/compras");

module.exports = (app) => {

    app.get('/compra', CompraController.exibeCompras());

    app.get('/compra/produto/:idProduto', CompraController.exibeComprasProduto());

    app.get('/compra/cliente/:idCliente', CompraController.exibeComprasCliente());

    app.get('/compra/fornecedor/:idFornecedor', CompraController.exibeComprasFornecedor());
    
    app.post('/compra/adiciona/', CompraController.realizaCompra());

    app.put('/compra/altera/:_id', CompraController.cancelaCompra());
    
}