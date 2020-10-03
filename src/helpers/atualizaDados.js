module.exports = async (Model, req, res) => {
  const { _id } = req.params;
  delete req.body.senha;
  try {
    await Model.updateOne({ _id }, { ...req.body });
    res.send(JSON.stringify({ modified: true }));
  } catch (err) {
    res.send(JSON.stringify({ modified: false }));
  }
};
