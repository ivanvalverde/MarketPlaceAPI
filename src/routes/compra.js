const CompraController = require("../controllers/compras");

module.exports = (app) => {

    app.get('/compra', CompraController.exibeCompras());

    app.get('/compra/produto/:idProduto', CompraController.exibeComprasProduto());

    app.get('/compra/cliente/:idCliente', CompraController.exibeComprasCliente());
    
    app.post('/compra/adiciona/', CompraController.realizaCompra());

    app.put('/compra/:_id', CompraController.cancelaCompra());
    
}