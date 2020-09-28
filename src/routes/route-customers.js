const UsuarioController = require('../controllers/controller-customers');

module.exports = (app) => {

    app.get('/usuario', UsuarioController.exibeUsuarios());
    
    app.post('/usuario/adiciona', UsuarioController.addUsuarios());
    
    app.delete('/usuario/:id', UsuarioController.deletaUsuarios());
    
    app.put('/usuario/:id', ()=>{});
    
}