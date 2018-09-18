var exports = module.exports = {}
var db = require('../config/datasource.js');
var User = require('../models/user.js')(db.sequelize, db.Sequelize);
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

const findUserByEmail = async (email) => {
    let user = await User.findOne({where: {email: email}})
    return user
}

exports.signup = async (req, res) => {
    const body = req.body;

    if (!body.email || !validator.isEmail(body.email)) {
        return res.status(400).json({success: false, error: 'Please enter an valid email to register'});
    } else if (!body.password) {
        return res.status(400).json({success: false, error: 'Please enter a password to register'});
    } else {
        try {
            let user = await findUserByEmail(body.email)

            if (user)
                return res.status(400).json({success: false, error: 'That email is already taken'})

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

        } catch (e) {
            return res.status(400).json({success: false, error: e.message});
        }
    }
}

exports.signin = async (req, res) => {
    try {
        const body = req.body

        if(!body.email) {
            return res.status(400).json({success: false, error: 'Please enter an valid email to login'});
        } else if(!body.password) {
            return res.status(400).json({success: false, error: 'Please enter a password to login'});
        } else {

            let user = await findUserByEmail(body.email)

            if (!user)
                throw new Error('Email does not exist')

            if (!bCrypt.compareSync(body.password, user.password))
                throw new Error('Incorrect password')

            let data = {
                success: true,
                message: 'Successfully login',
                token: user.getJWT()
            }

            res.status(200).json(data)
        }
    }catch (e) {
        return res.status(400).json({success: false, error: e.message});
    }
}

exports.dashboard = (req, res) => {
    console.log(req)
    res.json(req.user)
}

exports.logout = (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
}