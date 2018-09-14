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
        errors['question_id'] = 'This field is required.'
    } else if (!body.participation_id) {
        errors['participation_id'] = 'This field is required.'
    } else if (!body.alternative_id) {
        errors['alternative_id'] = 'This field is required.'
    }
    if (Object.keys(errors).length) {
        return res.status(400).send({
            'Error': errors
        });
    }

    try {
        //Validating if given FKS exist
        let question = await QuestionModel.findOne({ where: { id: body.question_id } }).then((question) => {
            return question
        });
        if (!question) {
            return res.status(404).json({ success: false, error: 'Question not found on database!' });
        }

        let participation = await ParticipationModel.findOne({ where: { id: body.participation_id } }).then((participation) => {
            return participation
        });
        if (!participation) {
            return res.status(404).json({ success: false, error: 'Participation not found on database!' });
        }

        let alternative = await AlternativeModel.findOne({ where: { id: body.alternative_id } }).then((alternative) => {
        });
        if (!alternative) {
            return res.status(404).json({ success: false, error: 'Alternative not found on database!' });
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
                return res.status(400).json({ success: false, error: 'Answer already exist' });
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
                        message: 'Answer created succesfully',
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