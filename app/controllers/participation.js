import { basename } from 'path';

var exports = module.exports = {}
var db = require('../config/datasource.js');
var StudentModel = require('../modles/student.js')(db.sequelize, db.Sequelize);
var AnswerModel = require('../models/answer.js')(db.sequelize, db.Sequelize);
var QuestionModel = require('../models/question.js')(db.sequelize, db.Sequelize);
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize);
var AlternativeModel = require('../models/alternative.js')(db.sequelize, db.Sequelize);

exports.create = async function (req, res) {
    const body = req.body;

    // Validates mandatory parameters
    let errors = {};

    if (!body.practise_exam_id) {
        errors['practise_exam_id'] = 'Este campo é necessário!'
    } else if (!body.student_id) {
        errors['student_id'] = 'Este campo é necessário!'
    } else if (!body.time_of_conclusion) {
        errors['time_of_conclusion'] = 'Este campo é necessário!'
    } else if (!body.numberOfQuestion){
        errors['time_of_conclusion'] = 'Este campo é necessário!'
    } else if (!body.numberOfCorrectAnswers){
        errors['numberOfCorrectAnswers'] = 'Este campo é necessário!'
    } else if (!body.numberOfWrongAnswers){
        errors['numberOfWrongAnswers'] = 'Este campo é necessário!'
    }

    if (Object.keys(errors).length) {
        return res.status(400).send({
            'Error': errors
        });
    }

    try {
        // Validating if stundent and practiseExam are on the DB.
        //If they're not, the participation shouldn't exist
        if (!await Practise_ExamModel.findOne({ where: { id: body.practise_exam_id } })) {
            return res.status(404).json({ success: false, error: 'Prova não encontrada na base de dados!' });
        }
        let student = await StudentModel.findOne({ where: { id: body.student_id } })
        if (!student) {
            return res.status(404).json({ success: false, error: 'Estudante não encontrado na base de dados!' });
        }
        
        console.log("Funciona: " + participation_id + "\n" + student_id);
        
        // Check if participation already exists
        ParticipationModel.findOne({
            where: { participation_id: body.participation_id }
        
        }).then((participation) => {
            // If the participation exists, it's numberOfCorrectAnswers, numberOfWrongAnswers, hitRatio and time_of_conclusion fields should be updated 
            ParticipationModel.update(
                { numberOfCorrectAnswers: body.numberOfCorrectAnswers, numberOfWrongAnswers: body.numberOfWrongAnswers, hitRatio: body.hitRatio, time_of_conclusion: body.time_of_conclusion },
                {   where: {
                        student_id: body.student_id,
                        practise_exam_id: body.practise_exam_id
                        }
                }
                    ).then(function (updateStatus) {
                        // The update function returns 1 if update was successful
                        if (updateStatus[0] === 1) {
                            // Since the update function doesn`t return the updated object, we have
                            // to find it again and return it 
                            ParticipationModel.findOne({
                                where: {
                                    question_id: body.question_id,
                                    participation_id: body.participation_id,
                                    alternative_id: body.alternative_id,
                                    time_to_answer: body.time_to_answer
                                }
                            }).then(function (updatedParticipation) {
                                res.status(201).json({
                                    success: true,
                                    message: 'Participação atualizada com sucesso!',
                                    participation: updatedParticipation.toJSON()
                                });
                            });
                        } else {
                            // Just in case if the updated response returns anything different than 1
                            return res.status(500).send({
                                message: "Algo errado com a atualização de uma participação "
                            });
                        }
                    });
                }

            */

            } else {
                // Save new data on database and send it back to the client
                var data = {
                    participation_id: body.participation_id,
                    practise_exam_id: body.practise_exam_id,
                    student_id: body.student_id,

                };
                ParticipationModel.create(data).then(function (participation) {
                    res.status(201).json({
                        success: true,
                        message: 'Participação criada com sucesso!',
                        participation: participation.toJSON()
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