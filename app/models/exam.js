const config = require('../config/config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {'dialect':config.production.dialect});

module.exports = (sequelize, Sequelize) => {

    var Exam = sequelize.define('exam', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        aob_exam: {type: Sequelize.BOOLEAN, notEmpty: true},
        aob_exam_year: {type: Sequelize.INTEGER}
    });

    return Exam;
}
