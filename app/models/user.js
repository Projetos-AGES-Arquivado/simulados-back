const jwt           	= require('jsonwebtoken');
const CONFIG            = require('../config/config');

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
        return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.auth.secret, {expiresIn: CONFIG.auth.expiration_time});
    };

    User.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return User;
}
