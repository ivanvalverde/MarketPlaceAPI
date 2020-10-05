module.exports = async (Model, req ,res) => {
  const { _id } = req.params; 
  await Model.findOne({ _id }, (err, elemento)=>{
      if (err) res.send(JSON.stringify({results: err}));
      res.send({results: elemento}).json();
  });
}