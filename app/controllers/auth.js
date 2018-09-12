var exports = module.exports = {}
var db = require('../config/datasource.js');
var User = require('../models/user.js')(db.sequelize, db.Sequelize);
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

exports.signup = function (req, res) {
    const body = req.body;

    if (!body.email || !validator.isEmail(body.email)) {
        return res.status(400).json({success: false, error: 'Please enter an valid email to register'});
    } else if (!body.password) {
        return res.status(400).json({success: false, error: 'Please enter a password to register'});
    } else {
        try {
            User.findOne({where: {email: body.email}}).then((user) => {
                if (user) {
                    return res.status(400).json({success: false, error: 'That email is already taken'});
                } else {
                    var data = {
                        email: body.email,
                        password: bCrypt.hashSync(body.password, bCrypt.genSaltSync(8), null),
                        name: body.name,
                        username: body.username
                    };

                    User.create(data).then(function (user) {
                        res.status(201).json({
                            success: true,
                            message: 'Successfully created new user',
                            user: user.toJSON(),
                            token: user.getJWT()
                        })
                    })
                }
            })
        } catch (e) {
            return res.status(400).json({success: false, error: e.message});
        }
    }
}

exports.signin = function (req, res) {
    try {
        const body = req.body

        if(!body.email) {
            return res.status(400).json({success: false, error: 'Please enter an valid email to login'});
        } else if(!body.password) {
            return res.status(400).json({success: false, error: 'Please enter a password to login'});
        } else {
            User.findOne({where: {email: body.email}}).then(function (user) {

                if (!user)
                    throw new Error('Email does not exist')
    
                if (!bCrypt.compareSync(body.password, user.password))
                    throw new Error('Incorrect password')
    
                let data = {
                    success: true,
                    message: 'Successfully login',
                    user: user.toJSON(),
                    token: user.getJWT()
                }
    
                res.status(200).json(data)
    
            }).catch(function (err) {
                return {'error':err}
            })
        }
    }catch (e) {
        return res.status(400).json({success: false, error: e.message});
    }
}

exports.dashboard = function (req, res) {
    console.log(req)
    res.json(req.user)
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}