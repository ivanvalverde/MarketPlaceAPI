module.exports = async function insereProdutos(produto, fornecedor, req,resp){
    const product = new produto({});

    await fornecedor.find({"razaoSocial": req.body.fornecedor}, (err, elemento)=>{
        if (err) return err;
        product.fornecedor = elemento[0]._id;
    });

    product.nome = req.body.nome;
    product.descricao = req.body.descricao;
    product.avaliacao = req.body.avaliacao
    product.preco = req.body.preco;
    product.estoque = req.body.estoque;

    await product.save((err) => {
        if (err) resp.send(err)
    });

    resp.redirect('/produto')
}