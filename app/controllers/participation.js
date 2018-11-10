var exports = module.exports = {}
var db = require('../config/datasource.js');
var StudentModel = require('../models/student.js')(db.sequelize, db.Sequelize);
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize);

exports.create = async function (req, res) { 

};

exports.createParticipation = async (student, exam, questions, res) => {
    let date = new Date();

    let participation = await ParticipationModel.create(
        {
            participation_date: date,
            time_of_conclusion: null,
            student_id: student.id,
            practise_exam_id: exam.id,
            numberOfQuestions: questions.length,
            numberOfCorrectAnswers: 0,
            numberOfWrongAnswers: 0,
            hitRatio: 0,
        })

    if (!participation)
        return res.status(400).json({success: false, error: 'Error on create participation'})

    return participation
}