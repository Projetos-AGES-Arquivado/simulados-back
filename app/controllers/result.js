var exports = module.exports = {}
var db = require('../config/datasource.js');
var StudentModel = require('../modles/student.js')(db.sequelize, db.Sequelize);
var AnswerModel = require('../models/answer.js')(db.sequelize, db.Sequelize);
var QuestionModel = require('../models/question.js')(db.sequelize, db.Sequelize);
var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize);
var AlternativeModel = require('../models/alternative.js')(db.sequelize, db.Sequelize);
var PractiseExam_QuestionsModel = require('../models/practiseexam_questions.js')(db.sequelize, db.Sequelize);

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