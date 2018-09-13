const { ExtractJwt, Strategy } = require('passport-jwt');
const db = require('../config/datasource.js');
const User = require('../models/user.js')(db.sequelize, db.Sequelize);
const CONFIG        = require('../config/config');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.auth.secret;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        console.log(jwt_payload) //{ user_id: 30, iat: 1535502652, exp: 1535512652 }
        try {
            User.findById(jwt_payload.user_id).then((user) => {
                if (!user) {
                    return res.status(400).json({success: false, error: 'User not found'});
                } else {
                    return done(null, user)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }));
}