module.exports = (Model, req) => {
    const {nome, email, telefone, endereco, senha, foto} = req.body;
    const model = new Model({nome, email, telefone, endereco, foto});
    model.setSenha(senha);

    return model;
}