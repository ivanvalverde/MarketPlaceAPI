module.exports = (Model,res) => {
    Model.find({}, (err, elemento) => {
        if (err) res.send(JSON.stringify({results: err}));
        res.send({results: elemento}).json();
    });
}