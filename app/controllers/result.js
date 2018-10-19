var exports = module.exports = {}
var db = require('../config/datasource.js')

var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize)

/**
 * This function receives data from the client, calculate the results of a given exam,
 * builds an object of it and returns it back to the client.
 * @param {*request} req 
 * @param {*responde} res 
 */
exports.calcResult = async function (req, res) {
    const participationId = req.params.participationId;
    try {
        if (!participationId) {
            return res.status(400).json({ success: false, error: 'ID da participação não informada!' });
        }
        else {
            // Fetch the participation
            let participation = await ParticipationModel.findOne({ where: { id: participationId } });
            if (!participation) {
                return res.status(401).json({ success: false, error: 'Participação não encontrada na base de dados!' });
            } else {
                let querySubAreas = `SELECT DISTINCT subA.id, subA.name
                            FROM answers ans 
                            INNER JOIN participations part
                                ON ans.participation_id = part.id
                            INNER JOIN questions quest
                                ON ans.question_id = quest.id
                            INNER JOIN alternatives alt
                                ON quest.id = alt.id 
                            INNER JOIN subareas subA
                                ON quest. subarea_id = subA.id
                            Where part.id = ${participationId};`;

                let queryQuestions = `SELECT DISTINCT subA.id, ans.question_id, ans.time_to_answer, alt.correct
                            FROM answers ans 
                            INNER JOIN participations part
                                ON ans.participation_id = part.id
                            INNER JOIN questions quest
                                ON ans.question_id = quest.id
                            INNER JOIN alternatives alt
                                ON quest.id = alt.id 
                            INNER JOIN subareas subA
                                ON quest. subarea_id = subA.id
                            Where part.id = ${participationId};`;
                
                let subAreas = await db.sequelize.query(querySubAreas, { type: db.sequelize.QueryTypes.SELECT });
                let questions = await db.sequelize.query(queryQuestions, { type: db.sequelize.QueryTypes.SELECT });

                for(let i = 0; i< questions.length; i++){
                    console.log(Object.values(questions[i]));
                }

                for(let i = 0; i < questions.length; i++) {
                    if(questions[i] != undefined){
                        for(let j = 0; j < subAreas.length; j++) {
                            if(!subAreas[j].hasOwnProperty("questions")){
                                subAreas[j].questions = [];
                            } 
                            if(questions[i].id === subAreas[j].id){
                                subAreas[j].questions.push(questions[i]);                          
                            }
                        }
                    }
                }
                res.status(200).json({
                    success: true,
                    message: 'Resultado buscado com sucesso!',
                    result: subAreas
                });
            }
        }

    } catch (err) {
        res.status(401)
        .json({ 
            success: false, error: 'Erro ao buscar resultado de exame: ' + 
            console.log(err.message) 
        });
    }
}