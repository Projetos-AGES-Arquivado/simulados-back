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
                let query = `SELECT subA.id, subA.name, ans.question_id, ans.time_to_answer, alt.correct
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
                db.sequelize
                    .query(query, { type: db.sequelize.QueryTypes.SELECT })
                    .then(result => {
                        // First, we create our initial object of subAreas
                        let resultObject = [];
                        // For each question found...
                        for (let i = 0; i < result.length; i++) {                            
                            // First we check if subArea already exist in our Object
                            if (resultObject[result[i].id] != undefined) {
                                buildQuestion(resultObject, result, i);
                            } else {
                                // If the subarea doesn`t exist, then
                                // Creates a subArea object before building a question
                                const subArea = {
                                    subAreaName: result[i].name,
                                    questions: []
                                };
                                console.log(`New subarea being included: ${subArea}`);
                                resultObject[result[i].id] = subArea;
                                buildQuestion(resultObject, result, i);
                            }
                        }
                        res.status(200).json({
                            success: true,
                            message: 'Resultado buscado com sucesso!',
                            result: resultObject
                        });
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

/**
 * This function builds a question and add it to the resultObject
 * @param {*} resultObject 
 * @param {*} result 
 * @param {*} i 
 */
async function buildQuestion(resultObject, result, i) {
    // Lets check if the question already exist, just to prevent failures
    if (resultObject[result[i].id].questions[result[i].question_id] != undefined) { // Se a questão existe na subArea mencionada
        console.log("Question already exist");
    } else {
        // If the Question doesn`t exist on mentioned subArea, build it.
        const question = {
            question_id: result[i].question_id,
            correct: result[i].correct,
            time_to_answer: result[i].time_to_answer
        };
        resultObject[result[i].id].questions[result[i].question_id] = question;
    }
}