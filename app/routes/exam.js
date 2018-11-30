const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = function(app) {
    var examController = require('../controllers/exam.js')

    // Retrieves all exams
    app.get('/exams', /*passport.authenticate('jwt', {session:false}),*/ examController.findAll)

    // Retrieves all oab exams
    app.get('/exams/oab', /*passport.authenticate('jwt', {session:false}),*/ examController.getOabExams)

    // Create a new exam
    app.post('/exam', /*passport.authenticate('jwt', {session:false}),*/ examController.create)

    //Mount exam
    app.post('/exam/mount', /*passport.authenticate('jwt', {session:false}),*/ examController.mount)
}