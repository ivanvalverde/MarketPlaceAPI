module.exports = function exibirDados(dado,resp){
    dado.find({}, (err, elemento)=>{
        if (err) return err;
        resp.send(elemento);
    });
}