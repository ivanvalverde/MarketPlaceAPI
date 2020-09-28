require('dotenv/config'); 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB,{useNewUrlParser: true, useUnifiedTopology: true});
const usuarioSchema = require('../models/model-customer');


class UsuarioController {

    static exibeUsuarios(){

        const Usuario = new mongoose.model('Usuario', usuarioSchema);

        return (req, res)=>{
            
            Usuario.find({}, (err, usuarios)=>{
                if (err) {console.log(err)};
                res.send(usuarios);
            });
            
        }
    }
}

module.exports = UsuarioController;