var exports = module.exports = {}
var db = require('../config/datasource.js');
var Exam = require('../models/Exam.js')(db.sequelize, db.Sequelize);
var ExamQuestion = require('../models/practiseexam_questions.js')(db.sequelize, db.Sequelize);
var Question = require('../models/question.js')(db.sequelize, db.Sequelize);
var Alternative = require('../models/alternative.js')(db.sequelize, db.Sequelize);
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

exports.getQuestionsWithPagination = async function (req, res) {
    const data = {
        "examId": req.params.examId,
        "lastQuestion": req.params.lastQuestion,
        "amount": req.params.amount
    }

    if(!data.examId) 
        return res.status(400).json({success: false, error: 'Exam not informed'});
        else {
            try {
                //Fetch exam
                Exam.findById(data.examId).then( async (exam) => {
                    if (!exam) {
                        return res.status(401).json({success: false, error: 'Exam not found'});
                    } else {
    
                        /*===== How to order the questions of exam of OAB? =======*/

                        //Fetch questions
                        let questions = await Question.findAll({ offset: data.lastQuestion, limit: data.amount, where: {practise_exam_id: data.examId}, include: [ExamQuestion]})
                            .then((questions) => {
                            
                                questions.forEach(question => {
                                    question.alternatives = await Alternative.find({where: {question_id: question.id}}).then(alternatives => {
                                        return alternatives
                                    })
                                })
                        })

                        if(questions)
                            res.status(200).json({
                                success: true,
                                message: 'Successfully fetch the questions',
                                questions: questions.toJSON()
                            })
                        else
                            return res.status(401).json({success: false, error: 'Questions not found'});
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }