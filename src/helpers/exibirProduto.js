module.exports = async function exibirDado(dado, req ,resp){
    const { nome } = req.params; 
    await dado.findOne({ nome }, (err, elemento)=>{
        if (err) return err;
        resp.send(`${elemento}`);
    });
  }