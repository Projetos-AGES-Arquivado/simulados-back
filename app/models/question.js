const config = require('../config/config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {'dialect':config.production.dialect});

module.exports = (sequelize, Sequelize) => {

    var Question = sequelize.define('question', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        statement: {type: Sequelize.TEXT},
        approved: {type: Sequelize.BOOLEAN}
    });

    Question.belongsTo(sequelize.import('./user'))
    //Question.belongsToMany(sequelize.import('./exam'), {through: 'exam_question'})
    //Question.hasMany(sequelize.import('./examQuestion'), {through: 'exam_question'})

    return Question;
}
