const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
const mongoose = require('mongoose');
const clientModel = require('../../src/models/cliente');

let should = chai.should();



chai.use(chaiHttp);

describe('Route Cliente', () => {


    //GET ROUTE

    describe('Testing Route GET /Cliente', () => {
        it('It should return a status code of 200 and an array with objects', (done) => {
            chai.request(server)
                .get('/cliente')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results[0].should.be.an('object');
                    done();
                });

        });

        it('The array should return one or more objects with properties', (done) => {
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

    describe('/GET/:_id cliente', () => {
        it('It should GET the correct client by the given id', (done) => {
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

    describe('Testing Route POST /Cliente', () => {

        let testClient = {
            "nome": "Raimunda Pereira dos Santos",
            "email": "raimundinha123@gmail.com",
            "senha": "pereiraDosSantos",
            "telefone": "923945023",
            "endereco": "Avenida Maracanã 125",
            "cpf": "15562736298"
        }

        it('It should return a status code of 200', (done) => {
            chai.request(server)
                .post('/cliente/adiciona')
                .send(testClient)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });

        });


        //DELETE ROUTE

        describe('Testing Route DELETE /Cliente', () => {
            it('it should DELETE a client given the id', (done) => {
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
                            done();
                        });
                });
            });

        });

        //PUT ROUTE

        describe('Testing route PUT /Cliente', () => {
            it('it should UPDATE a client given the id', (done) => {

                chai.request(server)
                    .put('/cliente/altera/' + '5f7a5d378a06e901756200f8')
                    .send({telefone:'997656772'})
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