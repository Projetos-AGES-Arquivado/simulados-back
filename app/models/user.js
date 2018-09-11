const jwt           	= require('jsonwebtoken');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {

    var User = sequelize.define('user', {
        id: {autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
        name: {type: DataTypes.STRING, notEmpty: true},
        username: {type: DataTypes.TEXT},
        about: {type: DataTypes.TEXT},
        email: {type: DataTypes.STRING, validate: {isEmail: true}},
        password: {type: DataTypes.STRING, allowNull: false},
        last_login: {type: DataTypes.DATE},
        status: {type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active'}
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
