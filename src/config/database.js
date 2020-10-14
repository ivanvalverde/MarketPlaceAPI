require('dotenv/config'); 
const mongoose = require('mongoose');

if(process.env.NODE_ENV === 'test'){
    mongoose.connect(process.env.MONGODB_TEST,{useNewUrlParser: true, useUnifiedTopology: true});
}else{
    mongoose.connect(process.env.MONGODB_DEVELOPMENT,{useNewUrlParser: true, useUnifiedTopology: true});
}

const db = mongoose.connection;
const connect = () => db.on('open', () => {})

db.on('error', (err) => {
    if(err){
        db.close();
        console.log("Tentando reconectar")
        connect();
    }
})

connect();

module.exports = db;
// let bcrypt = require('bcryptjs');

// const Usuario = new mongoose.model('Usuario', usuarioSchema);
// let senhacara = "";
// let saltocara = "";
// Usuario.find({email: "coelho@gmail.com"}, (err, usuario)=>{
//     senhacara = usuario[0].senha;
//     saltocara = usuario[0].salto;
//     console.log(senhacara);
//     console.log(saltocara);

//     const hash = bcrypt.hashSync("maionese",saltocara);

//     console.log(hash);

//     console.log(bcrypt.compareSync("maionese", senhacara));
// });



/*db.on('open', ()=>{

    const Usuario = new mongoose.model('Usuario', usuarioSchema);

    const olho = new Usuario({usuario: "doido", email: "coelho@gmail.com"});
    olho.geraSenha("maionese");

    olho.save((err)=>{
        if(err) console.log(`Não foi possível salvar, o erro foi ${err}`);
    });

});*/