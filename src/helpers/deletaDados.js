module.exports = async function deletaDados(dado, req, res){
    await dado.deleteOne({
        email: req.params.email
    })

    res.send("Item deletado com sucesso");
}