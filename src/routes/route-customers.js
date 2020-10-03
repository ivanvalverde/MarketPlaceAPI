const UsuarioController = require('../controllers/controller-customers');

module.exports = (app) => {

    app.get('/usuario', UsuarioController.exibeUsuarios());

    app.get('/usuario/:email', UsuarioController.exibeUsuario());
    
    app.post('/usuario/adiciona', UsuarioController.adicionaUsuario());
    
    app.delete('/usuario/:email', UsuarioController.deletaUsuarios());
    
    app.put('/usuario/:id', UsuarioController.atualizaUsuarios());
    
}