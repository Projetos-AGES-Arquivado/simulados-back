const config = require('../config/config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {'dialect':config.production.dialect});

module.exports = (sequelize, Sequelize) => {

    var ExamQuestion = sequelize.define('exam_question', {});

    ExamQuestion.belongsTo(sequelize.import('./exam'))
    ExamQuestion.belongsTo(sequelize.import('./question'))

    return ExamQuestion;
}
