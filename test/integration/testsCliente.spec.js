const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
const mongoose = require('mongoose');
const clientModel = require('../../src/models/cliente');

let should = chai.should();
chai.use(chaiHttp);

let testObj = {};

describe('Route Cliente', () => {


    //GET ROUTE

    describe('Testando rota GET /Cliente', () => {
        it('Deve ter um status de 200 e retornar um array pelo menos 1 objeto', (done) => {
            chai.request(server)
                .get('/cliente')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results[0].should.be.an('object');
                    res.body.results.should.have.lengthOf.at.least(1);
                    done();
                });

        });

        it('O array retornado não deve estar vazio e deve conter um objeto com as propriedades do cliente', (done) => {
            chai.request(server)
                .get('/cliente')
                .end((err, res) => {
                    res.body.should.not.be.empty;
                    res.body.results[0].should.have.property('nome');
                    res.body.results[0].should.have.property('cpf');
                    res.body.results[0].should.have.property('email');
                    res.body.results[0].should.have.property('endereco');
                    res.body.results[0].should.have.property('telefone');
                    res.body.results[0].should.have.property('senha');
                    res.body.results[0].should.have.property('salto');
                    res.body.results[0].should.have.property('_id');
                    done();
                });

        });


    });

    //GET one ROUTE

    describe('Testando rota GET/_id /Cliente', () => {
        it('Deve retornar o cliente com o respectivo id', (done) => {
            chai.request(server)
                .get('/cliente/' + '5f7a5d378a06e901756200f8')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.results.should.have.property('nome').eql('João Paulo da Silva');
                    res.body.results.should.have.property('_id').eql('5f7a5d378a06e901756200f8');
                    done();
                });


        });

    });


    //POST ROUTE

    describe('Testando rota POST /Cliente', () => {

        let testClient = {
            "nome": "Raimunda Pereira dos Santos",
            "email": "raimundinha123@gmail.com",
            "senha": "pereiraDosSantos",
            "telefone": "923945023",
            "endereco": "Avenida Maracanã 125",
            "cpf": "15562736298"
        }

        it('Deve ter um status de 200 e adicionar no banco um objeto previamente construído', (done) => {
            chai.request(server)
                .post('/cliente/adiciona')
                .send(testClient)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results[(res.body.results.length - 1)].should.have.property('nome').eql('Raimunda Pereira dos Santos');
                    testObj = res.body.results[(res.body.results.length - 1)];
                    done();
                });

        });


        //DELETE ROUTE

        describe('Testando rota DELETE /Cliente', () => {
            it('Deve deletar um cliente adicionado ao banco e retornar um objeto com o atributo delete:true', (done) => {
                let createdClient = new clientModel({
                    "nome": "Adriana Rodriguez",
                    "email": "dindinha22@gmail.com",
                    "senha": "Rodriguez12345",
                    "telefone": "982733645",
                    "endereco": "Avenida Brasil 25660",
                    "cpf": "14748598675"
                })
                createdClient.save((err, client) => {
                    chai.request(server)
                        .delete('/cliente/' + client._id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('delete').eql(true);
                            done();
                        });
                });
            });

            it('Deve deletar o cliente inserido no teste do POST', (done) => {

                chai.request(server)
                    .delete('/cliente/' + testObj._id)
                    .end((err, res) => {
                        res.body.should.have.property('delete').eql(true);
                        done();
                    });

            });

        });

        //PUT ROUTE

        describe('Testando PUT /Cliente', () => {
            it('Deve ter status 200 e retornar um objeto com o atributo modified:true', (done) => {

                chai.request(server)
                    .put('/cliente/altera/' + '5f7a5d378a06e901756200f8')
                    .send({ telefone: '997656772' })
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