var exports = module.exports = {}
var db = require('../models/index.js');
var User = require('../models/user.js')(db.sequelize, db.Sequelize);
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

exports.create = async function (req, res) {
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
                        username: body.name
                    };

                    User.create(data).then(function (user) {
                        res.status(201).json({
                            success: true,
                            message: 'Successfully created new user',
                            user: user.toJSON()
                        })
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
};

exports.findAll = function (req, res) {
    try {
        User.all().then((users) => {
            res.status(200).json({
                success: true,
                message: 'Users found',
                users: JSON.stringify(users)
            })
        })
    }catch (e) {
        console.log(e)
    }
};

exports.findOne = function (req, res) {
    try {
        User.findById(req.params.id).then((user) => {
            if (user) {
                res.status(200).json({
                    success: true,
                    message: 'User found',
                    user: user.toJSON()
                })
            } else {
                res.status(400).json({
                    success: false,
                    error: 'User not found'
                })
            }
        })
    }catch (e) {
        console.log(e)
    }
};

exports.update = function (req, res) {
    try {
        const body = req.body;

        if (!body.email || !validator.isEmail(body.email)) {
            return res.status(400).json({success: false, error: 'Please enter an valid email to register'});
        }else{
            User.update(
                {
                    email: body.email,
                    password: bCrypt.hashSync(body.password, bCrypt.genSaltSync(8), null),
                    name: body.name,
                    username: body.username,
                    about: body.about,
                    status: body.status,
                },
                {
                    where: {id: req.params.id},
                    returning: true,
                    plain:true
                }
            ).then((result) => {
                User.findById(req.params.id).then((user) => {
                    if (user) {
                        res.status(200).json({
                            success: true,
                            message: 'User updated',
                            user: user.toJSON()
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            error: 'User not found'
                        })
                    }
                })
            })
        }
    }catch (e) {
        console.log(e)
    }
};

exports.delete = function (req, res) {
    try {
        User.destroy({where: {id: req.params.id}})
            .then((result) => {
                if(result == 1){
                    res.status(200).json({
                        success: true,
                        message: 'User deleted'
                    })
                }else{
                    res.status(400).json({
                        success: false,
                        error: 'User not deleted'
                    })
                }
            })
    }catch (e) {
        console.log(e)
    }
};
