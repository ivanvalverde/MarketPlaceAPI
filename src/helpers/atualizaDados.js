module.exports = async (Model, req, res) => {
  const { _id } = req.params;
  delete req.body._id;
  delete req.body.senha;
  delete req.body.fornecedor;
  try {
    await Model.updateOne({ _id }, { ...req.body });
    res.send(JSON.stringify({ modified: true }));
  } catch (err) {
    res.send(JSON.stringify({ modified: false }));
  }
};
