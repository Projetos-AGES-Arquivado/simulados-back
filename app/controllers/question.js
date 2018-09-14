var exports = module.exports = {}
var db = require('../config/datasource.js');
var Participation = require('../models/participation.js')(db.sequelize, db.Sequelize);
var Alternative = require('../models/alternative.js')(db.sequelize, db.Sequelize);
// var bCrypt = require('bcrypt-nodejs');
// var validator = require('validator');

exports.getQuestionsWithPagination = async (req, res) => {

    const data = {
        "examId": req.query.examId,
        "lastQuestion": req.query.lastQuestion ? req.query.lastQuestion : 0,
        "amount": req.query.amount ? req.query.amount : 10 
    }

    if(!data.examId) 
        return res.status(400).json({success: false, error: 'Exam not informed'});
    else {
        try {
            //Fetch exam
            Participation.findOne({ where: { practise_exam_id: data.examId } }).then(async (participation) => {
                if (!participation) {
                    return res.status(401).json({success: false, error: 'Exam not found'});
                }
                else if(data.lastQuestion >= participation.numberOfQuestions) return res.status(400).json({success: false, error: 'No more questions for this exam'});
                else {

                    /*===== How to order the questions of exam of OAB? =======*/

                    let query = `SELECT q.id, professor_id, coordinator_id, subarea_id, 
                        statement, approved, studyMaterials, comment, q.created_at, q.updated_at 
                        FROM questions q INNER JOIN practiseexam_questions pq
                        ON q.id = pq.question_id WHERE pq.practise_exam_id = ${data.examId}  
                        LIMIT ${data.lastQuestion}, ${data.amount};`

                    //Fetch questions
                    let questions = await db.sequelize
                    .query(query, { type: db.sequelize.QueryTypes.SELECT})
                        .then(questions => 
                            db.sequelize.Promise.each(questions, async question => 
                                question.alternatives = await Alternative
                                .findAll({where: {question_id: question.id}})
                                    .then(alternatives => alternatives)
                            )
                    )

                    if(questions.length)
                        res.status(200).json({
                            success: true,
                            message: 'Successfully fetch the questions',
                            questions: questions
                        })
                    else
                        return res.status(401).json({success: false, error: 'Questions of exam not found'});
                }
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({success: false, error: 'Ops! We have a problem here...'});
        }
    }
}