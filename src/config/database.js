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