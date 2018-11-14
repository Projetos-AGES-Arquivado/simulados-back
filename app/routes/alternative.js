const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = function(app) {
    var alternativeController = require('../controllers/alternative')

    // Retrieves all practiseexam_questions
    app.get('/alternatives', /*passport.authenticate('jwt', {session:false}),*/ alternativeController.findAll)
}