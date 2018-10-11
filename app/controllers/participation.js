import { basename } from 'path';

var exports = module.exports = {}
var db = require('../config/datasource.js');
var StudentModel = require('../modles/student.js')(db.sequelize, db.Sequelize);
var AnswerModel = require('../models/answer.js')(db.sequelize, db.Sequelize);
var QuestionModel = require('../models/question.js')(db.sequelize, db.Sequelize);
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize);
var AlternativeModel = require('../models/alternative.js')(db.sequelize, db.Sequelize);
var PractiseExam_QuestionsModel = require('../models/practiseexam_questions.js')(db.sequelize, db.Sequelize);

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
        // Validating if student and practiseExam are on the DB.
        //If they're not, the participation shouldn't exist
        let practiseExam = await Practise_ExamModel.findOne({ where: { id: body.practise_exam_id } });
        if(!practiseExam) {
            return res.status(404).json({ success: false, error: 'Prova não encontrada na base de dados!' });
        }
        let student = await StudentModel.findOne({ where: { id: body.student_id } })
        if (!student) {
            return res.status(404).json({ success: false, error: 'Estudante não encontrado na base de dados!' });
        }
        
        console.log("Funciona: " + participation_id + "\n" + student_id);
        
        // Check if participation already exists
        let existingParticipation = await ParticipationModel.findOne({ where: { participation_id: body.participation_id }});
        if(existingParticipation) {
            // If the participation exists, it's numberOfCorrectAnswers, numberOfWrongAnswers, hitRatio and time_of_conclusion fields should be updated 
            let updatedParticipation = await ParticipationModel.update(
                { numberOfCorrectAnswers: body.numberOfCorrectAnswers, numberOfWrongAnswers: body.numberOfWrongAnswers, hitRatio: body.hitRatio, time_of_conclusion: body.time_of_conclusion },
                { where: {
                        student_id: body.student_id,
                        practise_exam_id: body.practise_exam_id
                        }
                });
            if(updatedParticipation){
                // The update function returns 1 if update was successful
                if (updateStatus[0] === 1) {
                // Since the update function doesn`t return the updated object, we have to find it again and return it 
                    let participationModel = await ParticipationModel.findOne({ where: { participation_id: body.participation_id }});
                    
                    if(participationModel){
                                res.status(201).json({
                                    success: true,
                                    message: 'Participação atualizada com sucesso!',
                                    participation: updatedParticipation.toJSON()
                                });
                    } 
                    
                    else {
                        // Just in case if the updated response returns anything different than 1
                        return res.status(500).send({ message: "Algo errado com a atualização de uma participação " });
                    }
                }
            }            

        } 
    
        else {
            //Save new data on database and send it back to the client
            var data = {
                participation_id: body.participation_id,
                practise_exam_id: body.practise_exam_id,
                student_id: body.student_id
                };

            ParticipationModel.create(data).then(function (participation) {
                res.status(201).json({
                success: true,
                message: 'Participação criada com sucesso!',
                participation: participation.toJSON()
                });
            });
        }
    }
    
    catch (err) {
        res.status(500).send({
            'Error': err.message
        });
    }
};

exports.findOne = async function (req, res) {
    
    const participationId= req.params;

    try{
        if (!participationId)
            return res.status(400).json({ success: false, error: 'ID da participação não informada!' });
        else {
            //Fetch participation
            let participation = await Participation.findOne({ where: { id: participationId } });
        
            if (!participation) {
                return res.status(401).json({ success: false, error: 'Participação não encontrada na base de dados!' });
            } else {
            
                //Should return all answers submmited by the user in a given participation, along with question is, subarea's name and if it's correct or not
                //Is there any chance this might actually work?
                let query = `SELECT subA.name, ans.question_id, subA.name, alt.correct
                            FROM answer ans 
                            INNER JOIN participation part
                            ON ans.participation_id = part.id 
                            INNER JOIN question quest
                            ON ans.question_id = quest.id
                            INNER JOIN subareas subA
                            ON quest. subarea_id = subA.id
                            WHERE part.id = ${participationId};`;            
            
                //Fetch answers
                let answers = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT, model: Result });

                //Assuming it worked, how do we send answers back as a matrix?    
            }     
        }

        if(!answers.length)
            return res.status(401).json({ success: false, error: 'As respostas do usuário às questões deste simulado não foram encontradas.' });
    } catch (err) {
        res.status(401).json({ success: false, error: 'Ocorreu um erro ao buscar as respostas do usuário às questões deste simulado.' });
    }
}

