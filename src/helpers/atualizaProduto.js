module.exports = function atualizaProduto(dado,id,mudanca,resp){
    
    dado.find({"nome": id}, (err, elemento)=>{
        if (err) return err;
        
            elemento[0].nome = mudanca.nome;
            elemento[0].descricao = mudanca.descricao;
            elemento[0].avaliacao = mudanca.avaliacao;
            elemento[0].preco = mudanca.preco;
            elemento[0].estoque = mudanca.estoque;
        
            elemento[0].save();

        resp.status(200).send('Item modificado');
    });
}