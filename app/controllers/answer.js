var exports = module.exports = {}
var db = require('../config/datasource.js');
var AnswerModel = require('../models/answer.js')(db.sequelize, db.Sequelize);

exports.create = async function (req, res) {
    const body = req.body;

    // Validates mandatory parameters
    let errors = {};
    console.log(body);
    if (!body.question_id) {
        errors['question_id'] = 'This field is required.'
    } else if (!body.participation_id) {
        errors['participation_id'] = 'This field is required.'
    } else if (!body.alternative_id) {
        errors['alternative_id'] = 'This field is required.'
    }
    console.log("Passou por aki 2");
    if (Object.keys(errors).length) {
        return res.status(400).send({
            'Error': errors
        });
    }
    try {
        console.log("Passou por aki 3");
        var data = {
            question_id: body.question_id,
            participation_id: body.participation_id,
            alternative_id: body.alternative_id
        };
        console.log("Passou por aki 4");
        AnswerModel.create(data).then(function (answer) {
            res.status(201).json({
                success: true,
                message: 'Answer created succesfully',
                answer: answer.toJSON()
            })
        })
        console.log("Passou por aki 5");
    } catch (err) {
        res.status(500).send({
            'Error': err.message
        });
        console.log("Passou por aki 6");
    }
    console.log("Passou por aki 7");
};