const passport = require('passport');
require('../middleware/passport')(passport)

module.exports = function (app) {
    var participationController = require('../controllers/participation');

    // Returns result data by given participation id
    //app.get('/resul/:idParticipation', passport.authenticate('jwt', {session:false}), resultController.calcResult);
    app.get('result/:idParticipation', resultController.calcResult);
}