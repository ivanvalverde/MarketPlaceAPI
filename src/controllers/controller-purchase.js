require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const compraSchema = require('../models/model-purchase');
const exibirDados = require('../helpers/exibirDados');
const atualizaDados = require('../helpers/atualizaDados');
const insereDados = require('../helpers/insereDados');
const deletaDados = require('../helpers/deletaDados');
const dataAtual = require('../helpers/dataAtual');


class CompraController {

    static exibeCompras() {

        const Compra = new mongoose.model('Compra', compraSchema);

        return (req, res) => {

            exibirDados(Compra, res);

        }
    }

    static exibeComprasProduto() {

        const Compra = new mongoose.model('Compra', compraSchema);

        return (req, res) => {
            const { idProduto } = req.params.idProduto
            Compra.find({idProduto}, (err, compras) =>{
                if(err) res.send(err)
                res.send(compras)
            })

        }
    }

    static exibeComprasUsuario() {

        const Compra = new mongoose.model('Compra', compraSchema);

        return (req, res) => {
            const { idUsuario } = req.params.idUsuario
            Compra.find({idUsuario}, (err, compras) =>{
                if(err) res.send(err)
                res.send(compras)
            })

        }
    }

    static cancelaCompra() {
        
        const Compra = new mongoose.model('Compra', compraSchema);

        return async (req, res) => {
            const { _id } = req.params;
            Compra.replaceOne({ _id }, { dataCancelamento: dataAtual()})
        }
    }

    static realizaCompra() {

        const Compra = new mongoose.model('Compra', compraSchema);

        return async (req, res) => {
            const {idProduto, idCliente} = req.body;
            const compra = new Compra({idProduto, idCliente, dataCompra: dataAtual(), dataCancelamento: null})
            await compra.save((err) => {
                if(err) res.send(err)
            })
            res.redirect('/compra')
        }
    }
}

module.exports = CompraController;