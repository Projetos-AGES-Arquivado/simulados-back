const passport = require('passport')
require('../middleware/passport')(passport)

module.exports = (app) => {
var areaController = require('../controllers/area.js')
app.get('/areas', /*passport.authenticate('jwt', {session: false}),*/ areaController.findAll)
}