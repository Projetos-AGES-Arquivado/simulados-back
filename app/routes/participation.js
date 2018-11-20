const passport = require('passport');
require('../middleware/passport')(passport)

module.exports = function (app) {
    var participationController = require('../controllers/participation.js');
    
     // Create a user Participation on a OAB Exam
     //app.post('/participation', passport.authenticate('jwt', {session:false}), participationController.createOabParticipation);
     app.post('/participation/student/:student/exam/:examId', participationController.createParticipation);
     app.get('/participations/student/:studentId?', participationController.getParticipationsByStudentId);

}