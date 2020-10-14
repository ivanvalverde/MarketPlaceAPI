const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
const mongoose = require('mongoose');
const purchaseModel = require('../../src/models/compra');
const clientModel = require('../../src/models/cliente');
const productModel = require('../../src/models/produto');

let should = chai.should();
chai.use(chaiHttp);

describe('Route Compra', () => {

    beforeEach((done) => {

        purchaseModel.deleteMany({}, (err) => {
            clientModel.deleteMany({}, (err) => {
                productModel.deleteMany({}, (err) => {
                    done();
                });
            });
        });
    });


    //POST ROUTE

    describe('Testando rota POST /Compra', () => {

        it('Deve ter um status de 200 e adicionar no banco um objeto (compra) se baseando em um produto e um cliente', (done) => {

            let testClient = new clientModel({
                "nome": "Raimunda Pereira dos Santos",
                "email": "raimundinha123@gmail.com",
                "senha": "pereiraDosSantos",
                "telefone": "923945023",
                "endereco": "Avenida Maracanã 125",
                "cpf": "15562736298"
            });

            let testProduct = new productModel({
                "nome": "iPhone X",
                "descricao": "Produto Novo, de última geração",
                "avaliacao": "5 estrelas",
                "preco": "1999.99",
                "estoque": "23",
                "fornecedor": "Fornecedor anônimo"
            });


            testClient.save((err, user) => {
                testProduct.save((error, good) => {

                    let testPurchase = {
                        "idCliente": testClient._id,
                        "idProduto": testProduct._id,
                    }

                    chai.request(server)
                        .post('/compra/adiciona')
                        .send(testPurchase)
                        .end((err, res) => {

                            res.should.have.status(200);
                            res.body.results[(res.body.results.length - 1)].should.have.property('idCliente').eql(testClient.id);
                            res.body.results[(res.body.results.length - 1)].should.have.property('idProduto').eql(testProduct.id);
                            done();
                        });

                });

            });

        });
    });


    //GET ROUTE

    describe('Testando rota GET /Compra', () => {
        it('Deve ter um status de 200 e retornar um array de tamanho 0', (done) => {
            chai.request(server)
                .get('/compra')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results.should.have.lengthOf(0);
                    done();
                });

        });

    });

    //GET one ROUTE searching for client

    describe('Testando rota GET/_id /Compra com o id do cliente', () => {
        it('Deve retornar o status 200 e a compra que foi procurada através do id do cliente', (done) => {

            let testClient = new clientModel({
                "nome": "Irineu Zangief",
                "email": "zangiefloco@gmail.com",
                "senha": "vocenaosabenemeu",
                "telefone": "98769876",
                "endereco": "Rua Dona Maria 446",
                "cpf": "19871626351"
            });

            let testProduct = new productModel({
                "nome": "Playstation 5",
                "descricao": "Produto Novo, 1 Tera de memória, com CD grátis do Uncharted",
                "avaliacao": "3.8 estrelas",
                "preco": "3559.70",
                "estoque": "2",
                "fornecedor": "Fornecedor anônimo"
            });

            let testPurchase = new purchaseModel({
                "idCliente": testClient._id,
                "idProduto": testProduct._id,
            });

            testClient.save((err, user) => {
                testProduct.save((err, good) => {
                    testPurchase.save((err, buy) => {
                        chai.request(server)
                            .get('/compra/cliente/' + testClient._id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.an('object');
                                res.body.results[(res.body.results.length - 1)].should.have.property('idCliente').eql(testClient.id);
                                res.body.results[(res.body.results.length - 1)].should.have.property('_id').eql(testPurchase.id);
                                done();
                            });

                    });

                });
            });

        });

    });


    //GET one ROUTE searching for product


    describe('Testando rota GET/_id /Compra com o id do produto', () => {
        it('Deve retornar o status 200 e a compra que foi procurada através do id do produto', (done) => {

            let testClient = new clientModel({
                "nome": "Gabigol Teixeira",
                "email": "goleada123@yahoo.com.br",
                "senha": "gabigolgoleada",
                "telefone": "911998271",
                "endereco": "Rua Cesar Lattes 98",
                "cpf": "12276538415"
            });

            let testProduct = new productModel({
                "nome": "Guitarra Fender",
                "descricao": "Modelo Fender, 12 cordas",
                "avaliacao": "4.5 estrelas",
                "preco": "2398.65",
                "estoque": "6",
                "fornecedor": "Fornecedor anônimo"
            });

            let testPurchase = new purchaseModel({
                "idCliente": testClient._id,
                "idProduto": testProduct._id,
            });

            testClient.save((err, user) => {
                testProduct.save((err, good) => {
                    testPurchase.save((err, buy) => {
                        chai.request(server)
                            .get('/compra/produto/' + testProduct._id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.an('object');
                                res.body.results[(res.body.results.length - 1)].should.have.property('idProduto').eql(testProduct.id);
                                res.body.results[(res.body.results.length - 1)].should.have.property('_id').eql(testPurchase.id);
                                done();
                            });

                    });

                });
            });

        });

    });


    //PUT ROUTE

    describe('Testando PUT /Compra', () => {
        it('Deve ter status 200 e retornar um objeto com a data de cancelamento não nula', (done) => {

            let testClient = new clientModel({
                "nome": "Gabigol Teixeira",
                "email": "goleada123@yahoo.com.br",
                "senha": "gabigolgoleada",
                "telefone": "911998271",
                "endereco": "Rua Cesar Lattes 98",
                "cpf": "12276538415"
            });

            let testProduct = new productModel({
                "nome": "Guitarra Fender",
                "descricao": "Modelo Fender, 12 cordas",
                "avaliacao": "4.5 estrelas",
                "preco": "2398.65",
                "estoque": "6",
                "fornecedor": "Fornecedor anônimo"
            });

            let testPurchase = new purchaseModel({
                "idCliente": testClient._id,
                "idProduto": testProduct._id,
            });

            testClient.save((err, user) => {
                testProduct.save((err, good) => {
                    testPurchase.save((err, buy) => {
                        chai.request(server)
                            .put('/compra/altera/' + testPurchase._id)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.results.should.have.property('dataCancelamento').not.eql(null);
                                done();
                            });
                    });
                });
            });
 
        });
        
    });

});