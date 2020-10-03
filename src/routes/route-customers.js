const UsuarioController = require('../controllers/controller-customers');

module.exports = (app) => {

    app.get('/usuario', UsuarioController.exibeUsuarios());

    app.get('/usuario/:_id', UsuarioController.exibeUsuario());
    
    app.post('/usuario/adiciona', UsuarioController.adicionaUsuario());
    
    app.delete('/usuario/:_id', UsuarioController.deletaUsuario());
    
    app.put('/usuario/:_id', UsuarioController.atualizaUsuarios());
    
}