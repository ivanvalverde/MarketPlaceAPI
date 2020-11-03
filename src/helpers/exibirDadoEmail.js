module.exports = async (Model, req ,res) => {
    const { email } = req.params; 
    await Model.findOne({ email }, (err, elemento)=>{
        if (err) console.log("erro");
        res.send({results: elemento});
    });
  }