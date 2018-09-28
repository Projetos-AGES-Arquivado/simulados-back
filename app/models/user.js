const config = require('../config/config')
const jwt = require('jsonwebtoken')

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
    })

    User.prototype.getJWT = function () {
        return 'Bearer '+jwt.sign({user_id:this.id}, config.auth.secret, {expiresIn: config.auth.expiration_time})
    }

    return User
}
