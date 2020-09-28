let bcrypt = require('bcryptjs');

module.exports = (senha)=>{
    const salto = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha,salto);
    return {
        storedHash: hash,
        storedSalt: salto
    }
}