const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
const mongoose = require('mongoose');
const clientModel = require('../../src/models/cliente');

let should = chai.should();
chai.use(chaiHttp);

describe('Route Cliente', () => {

    beforeEach((done) => {

        clientModel.deleteMany({}, (err) => {
            done();
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
                    done();
                });

        });
    });


    //GET ROUTE

    describe('Testando rota GET /Cliente', () => {
        it('Deve ter um status de 200 e retornar um array de tamanho 0', (done) => {
            chai.request(server)
                .get('/cliente')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results.should.have.lengthOf(0);
                    done();
                });

        });

    });

    //GET one ROUTE

    describe('Testando rota GET/_id /Cliente', () => {
        it('Deve retornar o status 200 e o cliente com o respectivo id', (done) => {

            let user = new clientModel({
                "nome": "Maurício Carvalho",
                "email": "carvalhinho123@gmail.com",
                "senha": "camundongo",
                "telefone": "998877665",
                "endereco": "Rua General Polidoro 45",
                "cpf": "19987867821"
            });
            user.save((err, client) => {
                chai.request(server)
                    .get('/cliente/' + user._id)
                    .send(client)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.results.should.have.property('nome').eql('Maurício Carvalho');
                        res.body.results.should.have.property('_id').eql(client.id);
                        done();
                    });
            });


        });

    });


    //DELETE ROUTE

    describe('Testando rota DELETE /Cliente', () => {
        it('Deve retornar um status 200 e deletar um cliente adicionado ao banco e retornar um objeto com o atributo delete:true', (done) => {
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

    });

    //PUT ROUTE

    describe('Testando PUT /Cliente', () => {
        it('Deve ter status 200 e retornar um objeto com o atributo modified:true', (done) => {

            let testClient = new clientModel({
                "nome": "Fernanda Bezerra dos Santos",
                "email": "bezerrinha@gmail.com",
                "senha": "leandrinho4321",
                "telefone": "923762612",
                "endereco": "Avenida Atlântica 3889",
                "cpf": "15543736898"
            });

            testClient.save((err, user) => {
                chai.request(server)
                    .put('/cliente/altera/' + user._id)
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