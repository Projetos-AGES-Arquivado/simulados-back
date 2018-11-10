var exports = module.exports = {}
var db = require('../config/datasource.js')
var Exam = require('../models/practise_exam')(db.sequelize, db.Sequelize)
var Question = require('../models/question')(db.sequelize, db.Sequelize)
var ExamQuestion = require('../models/practiseexam_questions')(db.sequelize, db.Sequelize)
var Student = require('../models/student')(db.sequelize, db.Sequelize)
var Practise_exam = require('../models/practise_exam')(db.sequelize, db.Sequelize)
var participationController = require('./participation')

const findStudentById = async (id, res) => {
    let student = await Student.findById(id)

    if (!student)
        return res.status(400).json({success: false, error: 'User not found'})

    return student
}

exports.create = async (req, res) => {
    try {
        const body = req.body

        let date = new Date()

        //get student
        let student = await findStudentById(body.student_id, res)

        //Fetch questions
        let questions = await Question.all({where: {approved: 1}})

        //Create exam
        let exam = await Exam.create({is_aob_exam: false, aob_exam_year: date.getFullYear()})
        console.log(exam);

        //Add questions
        await Promise.all(
            questions.map((q) => {
                return ExamQuestion.create({practise_exam_id: exam.id, question_id: q.id})
            })
        )

        // Calls the Participation controller to create a participation on database
        // This call will need a refactor since the participation would be better called from the front-end
        let participation = await participationController.createParticipation(student, exam, questions, res);

        res.status(201).json({
            success: true,
            message: 'Successfully created new exam',
            participation: participation.toJSON(),
            exam: exam.toJSON()
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

/**
 * This function returns a list with all OAB (or AOB) exams
 */
exports.getOabExams = async (req, res) => {
    try {
        let exams = await Practise_exam.findAll({ where: { is_aob_exam: true }});
        
        let message = "";
        
        if(exams && exams.length > 0) {
            message = "Exames encontrados com sucesso";
        } else {
            message = "Nenhum exame da OAB foi encontrado na base da dados";
        }

        res.status(200).json({
            success: true,
            message: message,
            exams: exams
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}