require('dotenv/config');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const usuarioSchema = require('../models/model-customer');


class UsuarioController {

    static exibeUsuarios() {

        const Usuario = new mongoose.model('Usuario', usuarioSchema);

        return (req, res) => {

            Usuario.find({}, (err, usuarios) => {
                if (err) {
                    console.log(err)
                };
                res.send(usuarios);
            });

        }
    }

    static deletaUsuarios() {
        const Usuario = new mongoose.model('Usuario', usuarioSchema);

        return async(req, res) => {
            try {
                Usuario.deleteOne({
                    email: req.params.email
                })

                res.send({
                    response: true, user: user
                })
            } catch (err) {
                res.send({
                    response: false, err: err
                })
            }
        }
    }

    static addUsuarios() {
        const Usuario = new mongoose.model('Usuario', usuarioSchema);

        return async (req, res) => {
            const user = new Usuario({});
            user.nome = req.body.nome;
            user.geraSenha(req.body.senha);
            user.email = req.body.email;
            user.cpf = req.body.cpf
            user.telefone = req.body.telefone;
            user.endereco = req.body.endereco;

            await user.save((err) => {
                if (err) res.send(err)
            });

            res.redirect('/usuario')
        }
    }
}

module.exports = UsuarioController;