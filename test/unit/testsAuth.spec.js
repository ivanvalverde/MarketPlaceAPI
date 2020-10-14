const chai = require('chai');
let chaiHttp = require('chai-http');
const server = require('../../server');
let bcrypt = require('bcryptjs');
const hash = require('../../src/helpers/hash');
const clientSchema = require('../../src/models/cliente');

let should = chai.should();
chai.use(chaiHttp);

describe('Conferindo autenticação do usuário', () => {

    beforeEach((done) => {

        clientSchema.deleteMany({}, (err) => {
            done();
        });
    });

    it('Verifica se a hash salva é igual a hash criada a partir da senha armazenada', (done) => {

        let senhaArmazenada = "vestibular2021";
        let hashObj = hash(senhaArmazenada);
        let hashArmazenada = hashObj.storedHash;
        let saltArmazenado = hashObj.storedSalt;

        let testClient = new clientSchema({
            "nome": "Jonathan Almeida",
            "email": "almeidinha123@gmail.com",
            "senha": hashArmazenada,
            "salto": saltArmazenado,
            "telefone": "998765273",
            "endereco": "Avenida Rio Branco 200",
            "cpf": "19726453618"
        });

        testClient.save((err, usuario) => {

            chai.request(server)
                .get('/cliente')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.results.should.be.an('array');
                    res.body.results[0].should.have.property('senha').eql(bcrypt.hashSync(senhaArmazenada, usuario.salto))
                    bcrypt.compareSync(senhaArmazenada, hashArmazenada).should.be.eql(true);
                    done();
                });
        });

    });

});