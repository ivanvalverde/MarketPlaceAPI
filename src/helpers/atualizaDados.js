module.exports = function atualizaDados(dado,id,mudanca,resp){
    
    dado.find({"nome": id}, (err, elemento)=>{
        if (err) return err;
        
            elemento[0].nome = mudanca.nome;
            elemento[0].email = mudanca.email;
        
            elemento[0].save();

        resp.status(200).send('Item modificado');
    });
}