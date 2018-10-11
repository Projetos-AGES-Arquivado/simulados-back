const passport = require('passport');
require('../middleware/passport')(passport)

module.exports = function (app) {
    var participationController = require('../controllers/participation.js');
    
     // Create an Participation
     //app.post('/participation', passport.authenticate('jwt', {session:false}), participationController.create);
     app.post('/participation', participationController.create);

     app.get('result/:idParticipation', participationController.findOne);
}