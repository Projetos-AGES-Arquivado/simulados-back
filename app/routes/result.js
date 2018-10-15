const passport = require('passport');
require('../middleware/passport')(passport)

module.exports = function (app) {
    var resultController = require('../controllers/result');

    // Returns result data by given participation id
    //app.get('/result/:idParticipation?', passport.authenticate('jwt', {session:false}), resultController.calcResult);
    app.get('/result/:idParticipation?', resultController.calcResult);
}