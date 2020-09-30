module.exports = async function deletaProdutos(dado, req, res){
    await dado.deleteOne({
        nome: req.params.id
    })

    res.send("Item deletado com sucesso");
}