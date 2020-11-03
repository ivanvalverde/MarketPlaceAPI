module.exports = async (Model, req ,res) => {
    const { email } = req.params; 
    await Model.findOne({ email }, (err, elemento)=>{
        if (err) res.send(JSON.stringify({results: err}));
        res.send({results: elemento}).json();
    });
  }