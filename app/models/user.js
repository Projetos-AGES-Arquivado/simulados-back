const jwt           	= require('jsonwebtoken');
const config = require('../config/config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {'dialect':config.production.dialect});

module.exports = (sequelize, Sequelize) => {

    var User = sequelize.define('user', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        name: {type: Sequelize.STRING, notEmpty: true},
        username: {type: Sequelize.TEXT},
        about: {type: Sequelize.TEXT},
        email: {type: Sequelize.STRING, validate: {isEmail: true}},
        password: {type: Sequelize.STRING, allowNull: false},
        last_login: {type: Sequelize.DATE},
        status: {type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active'}
    });

    User.prototype.getJWT = function () {
        return "Bearer "+jwt.sign({user_id:this.id}, config.auth.secret, {expiresIn: config.auth.expiration_time});
    };

    User.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return User;
}
