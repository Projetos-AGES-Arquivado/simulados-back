const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = function(app) {
    var userController = require('../controllers/user.js')

    // Create a new user
    app.post('/users', passport.authenticate('jwt', {session:false}), userController.create)

    // Retrieve all users
    app.get('/users', passport.authenticate('jwt', {session:false}), userController.findAll)

    // Retrive a single user with user id
    app.get('/users/:id', passport.authenticate('jwt', {session:false}), userController.findOne)

    // Update an user with user id
    app.put('/users/:id', passport.authenticate('jwt', {session:false}), userController.update)

    //Delete an user with user id
    app.delete('/users/:id', passport.authenticate('jwt', {session:false}), userController.delete)
}