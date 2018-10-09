const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = (app) => {
    var professorController = require('../controllers/professor.js')

    app.get('/professor/questions/:professor/:subarea?/:offset?/:limit?', /*passport.authenticate('jwt', {session: false}),*/ professorController.getQuestionsWithPagination)
}