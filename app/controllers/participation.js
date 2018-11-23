var exports = module.exports = {}
var db = require('../config/datasource.js');
var StudentModel = require('../models/student.js')(db.sequelize, db.Sequelize);
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize);
var Practiseexam_questionsModel = require('../models/practiseexam_questions')(db.sequelize, db.Sequelize)
var Practise_examModel = require('../models/practise_exam')(db.sequelize, db.Sequelize)

/**
 * Get the number of questions of an exam
 */
const countQuestionsExam = async (exam_id) => {
    let answer = await Practiseexam_questionsModel.count({
        where: { 'practise_exam_id': exam_id }
    });
    return answer;
}

/**
 * Validates mandatory parameters
 * */
const validateParameters = async (body, res) => {
    let errors = {}

    if (!body.student_id) {
        errors['student_id'] = 'Este campo é necessário!'
    } 
    if (!body.exam_id) {
        errors['exam_id'] = 'Este campo é necessário!'
    }
    if (Object.keys(errors).length) {
        return res.status(400).send({
            'Error': errors
        })
    }

    if (!await StudentModel.findOne({ where: { id: body.question_id } })) {
        return res.status(404).json({ success: false, error: 'Participação não encontrada na base de dados!' });
    }    
}




// This function should be removed once the front-end points to the createParticipation() function
exports.createParticipationProv = async (req, res) => {
    let body = req.body;
    validateParameters(body, res);
    
    try {
        // Get the number of questions of the exam
        let countQuestions = await countQuestionsExam(body.exam_id);

        let date = new Date();

        let participation = await ParticipationModel.create(
            {
                participation_date: date,
                time_of_conclusion: null,
                student_id: body.student_id,
                practise_exam_id: body.exam_id,
                numberOfQuestions: countQuestions,
                numberOfCorrectAnswers: 0,
                numberOfWrongAnswers: 0,
                hitRatio: 0,
            })

        if (!participation)
            return res.status(400).json({ success: true, error: 'Error on creating a participation' })

        return participation

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}

exports.createParticipation = async (req, res) => {
    let body = req.body;

    try {
        // Get the number of questions of the exam
        let countQuestions = await countQuestionsExam(body.exam_id);

        let date = new Date();

        // Create a new Participation on DB
        let participation = await ParticipationModel.create(
            {
                participation_date: date,
                time_of_conclusion: null,
                student_id: body.student_id,
                practise_exam_id: body.exam_id,
                numberOfQuestions: countQuestions,
                numberOfCorrectAnswers: 0,
                numberOfWrongAnswers: 0,
                hitRatio: 0,
            })

        if (!participation)
            return res.status(400).json({ success: true, error: 'Error on creating a participation' })

        res.status(201).json({
            success: true,
            message: 'Successfully created a new participation',
            participation: participation.toJSON()
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}


exports.getParticipationsByStudentId = async (req, res) => {
    const studentId = req.params.studentId;

    if(!studentId) {
        return res.status(400).json({ success: false, error: 'ID do estudante não informada!' }); 
    }

    try {

        let participations = await db.sequelize.query(
            " SELECT PAR.PRACTISE_EXAM_ID AS PRACTISE_EXAM_ID," +
            "        PAR.STUDENT_ID AS STUDENT_ID, " +
            "        PAR.PARTICIPATION_DATE AS PARTICIPATION_DATE, " +
            "        PAR.TIME_OF_CONCLUSION AS TIME_OF_CONCLUSION, " +
            "        PAR.NUMBEROFQUESTIONS AS NUMBEROFQUESTIONS, " +
            "        PAR.NUMBEROFCORRECTANSWERS AS NUMBEROFCORRECTANSWERS, " +
            "        PAR.NUMBEROFWRONGANSWERS AS NUMBEROFWRONGANSWERS, " +
            "        PAR.HITRATIO AS HITRATIO, " +
            "        PAR.CREATED_AT AS PARTICIPATION_CREATE_DATE, " +
            "        EXA.NAME AS EXAM_NAME, " +
            "        EXA.IS_AOB_EXAM AS IS_AOB_EXAM, " +
            "        EXA.AOB_EXAM_YEAR AS AOB_EXAM_YEAR, " +
            "        EXA.AOB_EXAM_SERIAL AS AOB_EXAM_SERIAL " +
            " FROM " +
            "        PARTICIPATIONS PAR, " +
            "        PRACTISE_EXAMS EXA" +
            " WHERE " +
            "        PAR.PRACTISE_EXAM_ID = EXA.ID " +
            "        AND STUDENT_ID = :student_id",
            { replacements: {
                student_id: studentId
            }, type: db.sequelize.QueryTypes.SELECT
        });

        res.status(200).json({
            success: true,
            message: "Successfully list of participations",
            participations: participations
        });

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        })
    }
}