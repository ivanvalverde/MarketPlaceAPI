module.exports = (Model, req) => {
    const {nome, email, telefone, endereco, senha} = req.body;
    const model = new Model({nome, email, telefone, endereco});
    model.setSenha(senha);

    return model;
}