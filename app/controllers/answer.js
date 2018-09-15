var exports = module.exports = {}
var db = require('../config/datasource.js');
var AnswerModel = require('../models/answer.js')(db.sequelize, db.Sequelize);
var QuestionModel = require('../models/question.js')(db.sequelize, db.Sequelize);
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize);
var AlternativeModel = require('../models/alternative.js')(db.sequelize, db.Sequelize);

exports.create = async function (req, res) {
    const body = req.body;

    // Validates mandatory parameters
    let errors = {};

    if (!body.question_id) {
        errors['question_id'] = 'Este campo é necessário!'
    } else if (!body.participation_id) {
        errors['participation_id'] = 'Este campo é necessário!'
    } else if (!body.alternative_id) {
        errors['alternative_id'] = 'Este campo é necessário!'
    }
    if (Object.keys(errors).length) {
        return res.status(400).send({
            'Error': errors
        });
    }

    try {
        //Validating if given FKS exist
        if (!await QuestionModel.findOne({ where: { id: body.question_id } })) {
            return res.status(404).json({ success: false, error: 'Questão não encontrada na base de dados!' });
        }
        if (!await ParticipationModel.findOne({ where: { id: body.participation_id } })) {
            return res.status(404).json({ success: false, error: 'Participação não encontrada na base de dados!' });
        }
        if (!await AlternativeModel.findOne({ where: { id: body.alternative_id } })) {
            return res.status(404).json({ success: false, error: 'Alternativa não encontrada na base de dados!' });
        }

        // Check if answer already exist
        AnswerModel.findOne({
            where: {
                question_id: body.question_id,
                participation_id: body.participation_id,
                alternative_id: body.alternative_id
            }
        }).then((answer) => {
            if (answer) {
                return res.status(400).json({ success: false, error: 'Resposta já existe!' });
            } else {
                // Save new data on database and send it back to the client
                var data = {
                    question_id: body.question_id,
                    participation_id: body.participation_id,
                    alternative_id: body.alternative_id
                };
                AnswerModel.create(data).then(function (answer) {
                    res.status(201).json({
                        success: true,
                        message: 'Resposta criada com sucesso!',
                        answer: answer.toJSON()
                    });
                });
            }
            });
    } catch (err) {
        res.status(500).send({
            'Error': err.message
        });
    }

};