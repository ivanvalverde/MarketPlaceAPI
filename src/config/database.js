require('dotenv/config'); 
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB,{useNewUrlParser: true, useUnifiedTopology: true});
const usuarioSchema = require('../models/model-customer');
const db = mongoose.connection;
let bcrypt = require('bcryptjs');

const Usuario = new mongoose.model('Usuario', usuarioSchema);
let senhacara = "";
let saltocara = "";
Usuario.find({email: "coelho@gmail.com"}, (err, usuario)=>{
    senhacara = usuario[0].senha;
    saltocara = usuario[0].salto;
    console.log(senhacara);
    console.log(saltocara);

    const hash = bcrypt.hashSync("maionese",saltocara);

    console.log(hash);

    console.log(bcrypt.compareSync("maionese", senhacara));
});



/*db.on('open', ()=>{

    const Usuario = new mongoose.model('Usuario', usuarioSchema);

    const joka = new Usuario({usuario: "doido", email: "coelho@gmail.com"});
    joka.geraSenha("maionese");

    joka.save((err)=>{
        if(err) console.log(`Não foi possível salvar, o erro foi ${err}`);
    });

});*/