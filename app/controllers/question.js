var exports = module.exports = {}
var db = require('../config/datasource.js');
var Participation = require('../models/participation.js')(db.sequelize, db.Sequelize);
var Alternative = require('../models/alternative.js')(db.sequelize, db.Sequelize);
// var bCrypt = require('bcrypt-nodejs');
// var validator = require('validator');

exports.getQuestionsWithPagination = async (req, res) => {

    const { examId, lastQuestion = 0, amount = 10 } = req.query

    if(!examId) 
        return res.status(400).json({success: false, error: 'Simulado não informado!'});
    else {
            //Fetch exam
            Participation.findOne({ where: { practise_exam_id: examId } }).then(async (participation) => {
                if (!participation) {
                    return res.status(401).json({success: false, error: 'Simulado não informado!'});
                }
                else if(lastQuestion >= participation.numberOfQuestions) return res.status(400).json({success: false, error: 'No more questions for this exam'});
                else {

                    /*===== How to order the questions of exam of OAB? =======*/

                    let query = `SELECT q.id, professor_id, coordinator_id, subarea_id, 
                        statement, approved, studyMaterials, comment, q.created_at, q.updated_at 
                        FROM questions q INNER JOIN practiseexam_questions pq
                        ON q.id = pq.question_id WHERE pq.practise_exam_id = ${examId}  
                        LIMIT ${lastQuestion}, ${amount};`

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
                            message: 'Questões resgatadas com sucesso.',
                            questions: questions
                        })
                    else
                        return res.status(401).json({success: false, error: 'As questões deste simulado não foram encontradas.'});
                }
            }).catch(() => res.status(401).json({success: false, error: 'Ocorreu um erro ao buscar as questões.'}))
    }
}