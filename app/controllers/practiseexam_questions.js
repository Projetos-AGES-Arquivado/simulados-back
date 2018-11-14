var exports = module.exports = {}
var db = require('../config/datasource.js')
var ExamQuestion = require('../models/practiseexam_questions')(db.sequelize, db.Sequelize)

exports.findAll = async (req, res) => {
    try {
        ExamQuestion.all().then((exams_questions) => {
            res.status(200).json({
                success: true,
                message: 'Exams found',
                exams_questions: exams_questions
            })
        })
    } catch (e) {
        return res.status(400).json({success: false, error: e.message})
    }
}