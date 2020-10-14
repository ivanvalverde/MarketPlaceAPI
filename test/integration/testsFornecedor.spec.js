const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
const mongoose = require('mongoose');
const providerModel = require('../../src/models/fornecedor');

let should = chai.should();
chai.use(chaiHttp);

describe('Route Fornecedor', () => {

    beforeEach((done) => {

        providerModel.deleteMany({}, (err) => {
            done();
        });
    });


    //POST ROUTE

    describe('Testando rota POST /Fornecedor', () => {

        let testProvider = {
            "nome": "Eletrodomésticos SA",
            "razaoSocial": "Vendedor de eletrodomésticos",
            "cnpj": "29.248.023/0001-00",
            "telefone": "987656453",
            "endereco": "Avenida Brasil 171",
            "email": "eletrosa@hotmail.com",
            "senha": "12345"
        }

        it('Deve adicionar no banco um objeto previamente construído', (done) => {
            chai.request(server)
                .post('/fornecedor/adiciona')
                .send(testProvider)
                .end((err, res) => {
                    
                    res.body.results[(res.body.results.length - 1)].should.have.property('nome').eql('Eletrodomésticos SA');
                    res.body.results[(res.body.results.length - 1)].should.have.property('cnpj').eql('29.248.023/0001-00');
                    done();
                });

        });
    });


    //GET ROUTE

    describe('Testando rota GET /Fornecedor', () => {
        it('Deve ter um status de 200 e retornar um array de tamanho 0', (done) => {
            chai.request(server)
                .get('/fornecedor')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results.should.have.lengthOf(0);
                    done();
                });

        });

    });

    //GET one ROUTE 

    describe('Testando rota GET/_id /Fornecedor', () => {
        it('Deve retornar o status 200 e o fornecedor com o respectivo id', (done) => {

            let company = new providerModel({
                "nome": "Apple",
                "razaoSocial": "Tecnologia e vendas",
                "cnpj": "99.749.628/0001-51",
                "telefone": "98756453",
                "endereco": "Avenida Paulista 19870",
                "email": "applebr@yahoo.com.br",
                "senha": "maca123"
            });
            company.save((err, provider) => {
                chai.request(server)
                    .get('/fornecedor/' + company._id)
                    .send(provider)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.results.should.have.property('nome').eql('Apple');
                        res.body.results.should.have.property('_id').eql(provider.id);
                        done();
                    });
            });


        });

    });


    //DELETE ROUTE

    describe('Testando rota DELETE /Fornecedor', () => {
        it('Deve retornar um status 200 e deletar um fornecedor adicionado ao banco e retornar um objeto com o atributo delete:true', (done) => {
            let company = new providerModel({
                "nome": "Sony",
                "razaoSocial": "Tecnologia japonesa",
                "cnpj": "87.228.829/0001-24",
                "telefone": "976546271",
                "endereco": "Rua Álvaro Ramos 455",
                "email": "sonyjapa@badoo.com.br",
                "senha": "ynos"
            });
            company.save((err, provider) => {
                chai.request(server)
                    .delete('/fornecedor/' + provider._id)
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

    describe('Testando PUT /Fornecedor', () => {
        it('Deve ter status 200 e retornar um objeto com o atributo modified:true', (done) => {

            let testProvider = new providerModel({
                "nome": "Lojas Americanas",
                "razaoSocial": "Varejo store",
                "cnpj": "49.125.627/0001-68",
                "telefone": "789856342",
                "endereco": "Rua General Severiano 665",
                "email": "lojasAmericanas@gmail.com",
                "senha": "filosofo"
            });

            testProvider.save((err, company) => {
                chai.request(server)
                    .put('/fornecedor/altera/' + company._id)
                    .send({ telefone: '87654232' })
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