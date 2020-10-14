const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
const mongoose = require('mongoose');
const productModel = require('../../src/models/produto');
const providerModel = require('../../src/models/fornecedor');

let should = chai.should();
chai.use(chaiHttp);

describe('Route Produto', () => {

    beforeEach((done) => {

        productModel.deleteMany({}, (err) => {
            providerModel.deleteMany({}, (err) => {
                done();
            });
        });
    });


    //POST ROUTE

    describe('Testando rota POST /Produto', () => {

        it('Deve adicionar no banco um objeto previamente construído', (done) => {

            let company = new providerModel({
                "nome": "Accer",
                "razaoSocial": "Tecnologia americana",
                "cnpj": "19.876.149/0001-27",
                "telefone": "98792047",
                "endereco": "Rua General Polidoro 1000",
                "email": "accer@gmail.com.br",
                "senha": "accerTecnologia"
            });

            company.save((err, provider) => {

                let testProduct = {
                    "nome": "Notebook Gamer",
                    "descricao": "16 GB memória, i7",
                    "avaliacao": "5 estrelas",
                    "preco": "6299.00",
                    "estoque": "39",
                    "fornecedor": company._id
                };

                chai.request(server)
                    .post('/produto/adiciona')
                    .send(testProduct)
                    .end((err, res) => {

                        res.body.results[(res.body.results.length - 1)].should.have.property('nome').eql('Notebook Gamer');
                        res.body.results[(res.body.results.length - 1)].should.have.property('fornecedor').eql(provider.id);
                        done();
                    });

            });
        })
    });


    //GET ROUTE

    describe('Testando rota GET /Produto', () => {
        it('Deve ter um status de 200 e retornar um array de tamanho 0', (done) => {
            chai.request(server)
                .get('/produto')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results.should.have.lengthOf(0);
                    done();
                });

        });

    });

    //GET one ROUTE 

    describe('Testando rota GET/_id /Produto', () => {
        it('Deve retornar o status 200 e o produto com o respectivo id', (done) => {

            let company = new providerModel({
                "nome": "Prada",
                "razaoSocial": "Melhor produtora de tecidos e acessórios",
                "cnpj": "25.758.911/0001-33",
                "telefone": "98701926",
                "endereco": "Rua Marechal Floriano 876",
                "email": "prada22@badoo.com.br",
                "senha": "excelenciadeprodutos"
            });


            company.save((err, provider) => {

                let product = new productModel({
                    "nome": "Bolsa",
                    "descricao": "Prada",
                    "avaliacao": "4.8 estrelas",
                    "preco": "3100.00",
                    "estoque": "1",
                    "fornecedor": company._id
                });

                product.save((err, good) => {
                    chai.request(server)
                        .get('/produto/' + product._id)
                        .send(product)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.an('object');
                            res.body.results.should.have.property('nome').eql('Bolsa');
                            res.body.results.should.have.property('fornecedor').eql(company.id);
                            done();
                        });
                });
            });


        });

    });


    //DELETE ROUTE

    describe('Testando rota DELETE /Produto', () => {
        it('Deve retornar um status 200 e deletar um produto adicionado ao banco e retornar um objeto com o atributo delete:true', (done) => {

            let company = new providerModel({
                "nome": "Samsung",
                "razaoSocial": "Distribuidora de eletrônicos",
                "cnpj": "39.283.111/0002-39",
                "telefone": "929304912",
                "endereco": "Rua Marechal Deodoro 391",
                "email": "samsung@gmail.com.br",
                "senha": "123eletronicos"
            });


            company.save((err, provider) => {

                let product = new productModel({
                    "nome": "Televisão",
                    "descricao": "Tela plana 30 polegadas",
                    "avaliacao": "3 estrelas",
                    "preco": "1799.00",
                    "estoque": "129",
                    "fornecedor": company._id
                });

                product.save((err, good) => {
                    chai.request(server)
                        .delete('/produto/' + product._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('delete').eql(true);
                            done();
                        });
                });
            });

        });

    });

    //PUT ROUTE

    describe('Testando PUT /Produto', () => {
        it('Deve ter status 200 e retornar um objeto com o atributo modified:true', (done) => {

            let company = new providerModel({
                "nome": "Leroy Merlin",
                "razaoSocial": "Vendedora de diversos",
                "cnpj": "87.475.245/0001-12",
                "telefone": "985435223",
                "endereco": "Avenida Ayrton Senna 2098",
                "email": "leroymerlinloja@gmail.com",
                "senha": "excelenciaemtudo"
            });


            company.save((err, provider) => {

                let product = new productModel({
                    "nome": "Mesa",
                    "descricao": "1.5mx3m",
                    "avaliacao": "1.4 estrelas",
                    "preco": "400.00",
                    "estoque": "1098",
                    "fornecedor": company._id
                });

                product.save((err, good) => {
                    chai.request(server)
                        .put('/produto/altera/' + good._id)
                        .send({ avaliacao: '5 estrelas' })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('modified').eql(true);
                            done();
                        });
                });
            });
        });
    });

});