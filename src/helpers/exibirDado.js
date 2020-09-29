module.exports = async function exibirDado(dado, req ,resp){
  const { email } = req.params; 
  await dado.findOne({ email }, (err, elemento)=>{
      if (err) return err;
      resp.send(`${elemento}`);
  });
}