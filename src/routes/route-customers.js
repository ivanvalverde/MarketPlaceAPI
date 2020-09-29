const UsuarioController = require('../controllers/controller-customers');

module.exports = (app) => {

    app.get('/usuario', UsuarioController.exibeUsuarios());
    
    app.post('/usuario', ()=>{});
    
    app.delete('/usuario/:id', ()=>{});
    
    app.put('/usuario/:id', UsuarioController.atualizaUsuarios());
    
}