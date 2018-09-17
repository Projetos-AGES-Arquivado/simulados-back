const passport = require('passport');
require('../middleware/passport')(passport)

module.exports = function (app) {
    var answerController = require('../controllers/answer.js');
    
     // Create an Answer
     //app.post('/answer', passport.authenticate('jwt', {session:false}), answerController.create);
     app.post('/answer', answerController.create);
}