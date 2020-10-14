module.exports = async (Model, req, res) => {
  const { _id } = req.params;
  try {
    await Model.deleteOne({
      _id,
    });
    res.send({ delete: true }).json();
  } catch (err) {
    res.send({ delete: false }).json();
  }
};
