var exports = module.exports = {}
var db = require('../config/datasource.js')
var Participation = require('../models/participation.js')(db.sequelize, db.Sequelize)
var Alternative = require('../models/alternative.js')(db.sequelize, db.Sequelize)
var Question = require('../models/question.js')(db.sequelize, db.Sequelize)
var Coordinator = require('../models/coordinator')(db.sequelize, db.Sequelize)

exports.findAll = async (req, res) => {
    try {
        Question.all().then((questions) => {
            res.status(200).json({
                success: true,
                message: 'Questions found',
                questions: questions
            })
        })
    } catch (e) {
        return res.status(400).json({success: false, error: e.message})
    }
}

exports.getQuestionsWithPagination = async (req, res) => {

    const { examId, lastQuestion = 0, amount = 80 } = req.params

    if (!examId)
        return res.status(400).json({ success: false, error: 'Simulado não informado!' })
    else {
        //Fetch exam
        Participation.findOne({ where: { practise_exam_id: examId } }).then(async (participation) => {
            if (!participation) {
                return res.status(401).json({ success: false, error: 'Simulado não informado!' })
            }
            else if (lastQuestion >= participation.numberOfQuestions) return res.status(400).json({ success: false, error: 'No more questions for this exam' })
            else {

                /*===== How to order the questions of exam of OAB? =======*/

                let query = `SELECT q.id, professor_id, coordinator_id, subarea_id, 
                        statement, approved, studyMaterials, comment, q.created_at, q.updated_at 
                        FROM questions q INNER JOIN practiseexam_questions pq
                        ON q.id = pq.question_id WHERE pq.practise_exam_id = ${examId}  
                        LIMIT ${lastQuestion}, ${amount};`

                //Fetch questions
                let questions = await db.sequelize
                    .query(query, { type: db.sequelize.QueryTypes.SELECT })
                    .then(questions =>
                        db.sequelize.Promise.each(questions, async question =>
                            question.alternatives = await Alternative
                                .findAll({ where: { question_id: question.id } })
                                .then(alternatives => alternatives)
                        )
                    )

                let queryCount = `SELECT q.id FROM questions q INNER JOIN practiseexam_questions pq
                    ON q.id = pq.question_id WHERE pq.practise_exam_id = ${examId};`

                let questionsTotal = await db.sequelize.query(queryCount, { type: db.sequelize.QueryTypes.SELECT })

                if (questions.length)
                    res.status(200).json({
                        success: true,
                        message: 'Questões resgatadas com sucesso.',
                        total: questionsTotal.length,
                        questions: questions
                    })
                else
                    return res.status(401).json({ success: false, error: 'As questões deste simulado não foram encontradas.' })
            }
        }).catch(() => res.status(401).json({ success: false, error: 'Ocorreu um erro ao buscar as questões.' }))
    }
}

const validate = (body) => {
    let properties = ['professor_id', 'coordinator_id', 'subarea_id', 'statement', 'approved', 'comment']

    for(let p in properties){
        if(!body.hasOwnProperty(p) || body[p] === '')
            return false        
    }
    return true
}

exports.update = async (req, res) => {
    try {
        const body = req.body

        let valid = validate(body)
        if (!valid) {
            return res.status(400).json({success: false, error: 'Dados informados invalidados ou faltando'})
        }else{
            await Question.update(
                {
                    professor_id: body.professor_id,
                    coordinator_id: body.coordinator_id,
                    subarea_id: body.subarea_id,
                    statement: body.statement,
                    approved: body.approved,
                    studyMaterials: body.studyMaterials,
                    comment: body.comment                
                },
                {
                    where: {id: req.params.id},
                    returning: true,
                    plain:true
                }
            ).then(() => {
                Question.findById(req.params.id).then((question) => {
                    if (question) {
                        res.status(200).json({
                            success: true,
                            message: 'Question updated',
                            user: question.toJSON()
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            error: 'Question not found'
                        })
                    }
                })
            })
        }
    } catch (e) {
        return res.status(400).json({success: false, error: e.message})
    }
}

const isCoordinator = async user => !!(await Coordinator.findOne({where:{user_id:user.id}}))

exports.approve = async (req, res) => {
    try{
        let isUserCoordinator = await isCoordinator(req.user)
        if(!isUserCoordinator){
            return res.status(400).json({ success: false, error: 'Usuário sem permissão para esta ação' })
        }else{
            await Question.update(
                {
                    approved: req.body.approved
                },
                {
                    where: {id: req.body.id},
                    returning: true,
                    plain:true
                }
            ).then(() => {
                Question.findById(req.body.id).then((question) => {
                    if (question) {
                        res.status(200).json({
                            success: true,
                            message: 'Questão atualizada',
                            question: question.toJSON()
                        })
                    } else {
                        res.status(400).json({
                            success: false,
                            error: 'Questão não encontrada'
                        })
                    }
                })
            })
        }
    }catch (e) {
        return res.status(400).json({success: false, error: 'Ocorreu um erro ao aprovar esta questão'})
    }
}