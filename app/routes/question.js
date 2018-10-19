const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = (app) => {
    var questionController = require('../controllers/question.js')

    app.get('/questions/:examId?/:lastQuestion?/:amount?', /*passport.authenticate('jwt', {session: false}),*/ questionController.getQuestionsWithPagination)
    app.put('/questions/:id', /*passport.authenticate('jwt', {session:false}), */ questionController.update)
}