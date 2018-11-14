const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = function(app) {
    var practiseexam_questionsController = require('../controllers/practiseexam_questions')

    // Retrieves all practiseexam_questions
    app.get('/exams_questions', /*passport.authenticate('jwt', {session:false}),*/ practiseexam_questionsController.findAll)
}