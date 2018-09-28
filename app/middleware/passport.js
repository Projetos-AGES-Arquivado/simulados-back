const { ExtractJwt, Strategy } = require('passport-jwt')
const db = require('../config/datasource.js')
const User = require('../models/user.js')(db.sequelize, db.Sequelize)
const CONFIG        = require('../config/config')

module.exports = function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = CONFIG.auth.secret

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        try {
            User.findById(jwt_payload.user_id).then((user) => {
                if (!user) {
                    return new Error('User not found')
                } else {
                    return done(null, user)
                }
            })
        } catch (e) {
            return new Error(e)
        }
    }))
}