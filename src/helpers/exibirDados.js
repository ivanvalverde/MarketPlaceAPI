module.exports = async (Model, res) => {
    await Model.find({}, (err, elemento) => {
        if (err) {console.log("erro")}
        return res.send({ results: elemento });
    });
}