var exports = module.exports = {}
var db = require('../config/datasource.js')
var AnswerModel = require('../models/answer.js')(db.sequelize, db.Sequelize)
var QuestionModel = require('../models/question.js')(db.sequelize, db.Sequelize)
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize)
var AlternativeModel = require('../models/alternative.js')(db.sequelize, db.Sequelize)

//Returns the alternative chosen by the user
const choosedAnswer = async (body) => {
        
        let choosedAnswer = await AnswerModel.findOne({
                                where: {
                                    question_id: body.question_id,
                                    participation_id: body.participation_id
                                }
        });
        
        return choosedAnswer;    
}   

// Returns the correct answer for that question
const correctAnswer = async (body) => { 

    let correctAnswer = await AlternativeModel.findOne({
                            where: {
                                question_id: body.question_id,
                                correct: true
                            }
    });

    return correctAnswer
}

exports.create = async function (body) {
    const body = req.body;

    // Validates mandatory parameters
    let errors = {}

    if (!body.question_id) {
        errors['question_id'] = 'Este campo é necessário!'
    } else if (!body.participation_id) {
        errors['participation_id'] = 'Este campo � necess�rio!'
    } else if (!body.alternative_id) {
        errors['alternative_id'] = 'Este campo � necess�rio!'
    } else if (!body.time_to_answer) {
        errors['time_to_answer'] = 'Este campo � necess�rio!'
    }
    if (Object.keys(errors).length) {
        return res.status(400).send({
            'Error': errors
        })
    }


    // Validating if given FKS exist
    if (!await ParticipationModel.findOne({ where: { id: body.participation_id } })) {
        return res.status(404).json({ success: false, error: 'Participaçãoãoãocontrada na base de dados!' });
    }
    // Alternative will be used later to check if it is correct or not
    let alternative = await AlternativeModel.findOne({ where: { id: body.alternative_id } });

    if (!alternative) {
        return res.status(404).json({ success: false, error: 'Alternativa nãoencontrada na base de dados!' });
    }

    if (!await QuestionModel.findOne({ where: { id: body.question_id } })) {
        return res.status(404).json({ success: false, error: 'Questãonããoncontrada na base de dados!' });
    }
    
    // If the answer exist, it should be updated with new given time_to_answer and alternative_id
    if (choosedAnswer) {
        if (!body.time_to_answer) {
            return res.status(400).json({ success: false, error: 'time_to_answer = Este campo énecessáár para atualizar uma resposta!' });
        } else {
            // Calling update function
            const updateStatus = await AnswerModel.update(
                { time_to_answer: body.time_to_answer, alternative_id: body.alternative_id },
                { where: {
                        question_id: body.question_id,
                        participation_id: body.participation_id
                    }
                }
            );
            
            // The update function returns 1 if update was successful
            if (updateStatus[0] === 1) {
                // Since the update function doesn`t return the updated object, we have
                // to find it again and return it 
                const updatedAnswer = await AnswerModel.findOne({
                    where: {
                        question_id: body.question_id,
                        participation_id: body.participation_id,
                        alternative_id: body.alternative_id,
                        time_to_answer: body.time_to_answer
                    }
                });
                

                if(updatedAnswer) {
                    res.status(201).json({
                    success: true,
                    message: 'Resposta atualizada com sucesso!',
                    selectedAlternative: alternative,
                    correctAlternative: correctAnswer,
                    answer: updatedAnswer.toJSON()
                    });
                }

            } else {
                // Just in case if the updated response returns anything different than 1
                return res.status(500).send({
                    message: "Algo errado com a atualizaçãoe uma resposta "
                });
            }
            
        }
    }
    else {
        // Save new data on database and send it back to the client
        let data = {
            question_id: body.question_id,
            participation_id: body.participation_id,
            alternative_id: body.alternative_id
        };
        AnswerModel.create(data).then(function (answer) {
            res.status(201).json({
                success: true,
                message: 'Resposta criada com sucesso!',
                selectedAlternative: alternative,
                correctAlternative: correctAnswer,
                answer: answer.toJSON()
            });
        });
    }
};

