const CompraController = require("../controllers/controller-purchase");

module.exports = (app) => {

    app.get('/compra', CompraController.exibeCompras());

    app.get('/compra/:idProduto', ()=>{});

    app.get('/compra/:idCliente', ()=>{});
    
    app.post('/compra/adiciona/', CompraController.realizaCompra());

    app.put('/compra/:_id', ()=>{});
    
}