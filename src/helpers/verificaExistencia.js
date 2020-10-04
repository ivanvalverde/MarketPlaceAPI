module.exports = async(Model, _id, res) => {
  await Model.findById( { _id }, (err, elemento) => {
    if(err) res.send(JSON.stringify({ erro: `Ou cliente ou produto não existe`}))
  })
}