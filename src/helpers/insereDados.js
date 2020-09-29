module.exports = async function insereDados(dado,req,resp){
    const user = new dado({});
    user.nome = req.body.nome;
    user.geraSenha(req.body.senha);
    user.email = req.body.email;
    user.cpf = req.body.cpf
    user.telefone = req.body.telefone;
    user.endereco = req.body.endereco;

    await user.save((err) => {
        if (err) resp.send(err)
    });

    resp.redirect('/usuario')
}