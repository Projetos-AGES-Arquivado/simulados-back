var exports = module.exports = {}
var db = require('../config/datasource.js');
var Exam = require('../models/practise_exam')(db.sequelize, db.Sequelize);
var Participation = require('../models/participation')(db.sequelize, db.Sequelize);
var Question = require('../models/question')(db.sequelize, db.Sequelize);
var ExamQuestion = require('../models/practiseexam_questions')(db.sequelize, db.Sequelize);
var Student = require('../models/student')(db.sequelize, db.Sequelize);

exports.create = (req, res) => {
    const body = req.body;

    if (!body.student_id) {
        return res.status(400).json({success: false, error: 'You must inform student id'});
    } else {
        Student.findById(body.student_id).then(async (student) => {
            if (!student) {
                return res.status(400).json({success: false, error: 'User not found'});
            } else {
                let date = new Date()

                //Fetch questions
                let questions = await Question.all({where: {approved: 1}})

                //Create exam
                let exam = await Exam.create({aob_exam: true, aob_exam_year: date.getFullYear()})

                //Add questions
                await Promise.all(
                    questions.map((q) => {
                        return ExamQuestion.create({practise_exam_id: exam.id, question_id: q.id})
                    })
                )

                //Create participation
                Participation.create(
                    {
                        participation_date: date,
                        time_of_conclusion: null,
                        student_id: student.id,
                        practise_exam_id: exam.id,
                        numberOfQuestions: questions.length,
                        numberOfCorrectAnswers: 0,
                        numberOfWrongAnswers: 0,
                        hitRatio: 0,
                    })
                    .then((participation) => {
                        res.status(201).json({
                            success: true,
                            message: 'Successfully created new exam',
                            participation: participation.toJSON(),
                            exam: exam.toJSON()
                        })
                    })
            }
        })
    }
};