var authController = require('../controllers/auth.js')

module.exports = function (app) {

    app.post('/signup', authController.signup)
    app.post('/signin', authController.signin)
    app.get('/logout', authController.logout)

}






