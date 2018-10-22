var exports = module.exports = {}
var db = require('../config/datasource.js')
var Question = require('../models/question')(db.sequelize, db.Sequelize)
var Alternative = require('../models/alternative')(db.sequelize, db.Sequelize)

const getQuestions = async (professorId, offset, limit) => {
    let questions = await Question.findAll({where: {professor_id: professorId}, offset:offset, limit:limit})
    let total = await Question.findAndCountAll({where: {professor_id: professorId}})
    let alternatives = await Alternative.findAll({where: {question_id: [questions.map(q => q.id)]}})

    return {'questions':questions, 'alternatives':alternatives, 'total':total.count}
}

const getSubareaQuestions = async (professorId, subareaId, offset, limit) => {
    let questions = await Question.findAll({where: {professor_id: professorId, subarea_id:subareaId}, offset:offset, limit:limit})
    let total = await Question.findAndCountAll({where: {professor_id: professorId, subarea_id:subareaId}})
    let alternatives = await Alternative.findAll({where: {question_id: [questions.map(q => q.id)]}})

    return {'questions':questions, 'alternatives':alternatives, 'total':total.count}
}

exports.getQuestionsWithPagination = async (req, res) => {
    try{
        const { professor, subarea, offset = 0, limit = 10 } = req.params

        if(!professor){
            return res.status(400).json({success: false, error: 'Professor não informado!'})
        }else if(!subarea){
            let {questions=[], alternatives=[], total=0} = await getQuestions(professor, offset, limit)
            
            res.status(200).send({
                success: true,
                message: 'Questões buscadas com sucesso.',
                total: total,
                questions: questions,
                alternatives: alternatives
            })
        }else{
            let {questions=[], total=0} = await getSubareaQuestions(professor, subarea, offset, limit)
            res.status(200).json({
                success: true,
                message: 'Questões buscadas com sucesso.',
                total: total,
                questions: questions
            })
        }
    }catch(e){
        res.status(500).json({success: false, error: 'Ocorreu um erro ao buscar as questões. '+e})
    }
}