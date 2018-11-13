const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = function(app) {
    var examController = require('../controllers/exam.js')

    // Create a new user
    app.post('/exam', /*passport.authenticate('jwt', {session:false}),*/ examController.create)

    app.get('/exams/oab', /*passport.authenticate('jwt', {session:false}),*/ examController.getOabExams)

}