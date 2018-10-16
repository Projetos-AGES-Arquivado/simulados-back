var exports = module.exports = {}
var db = require('../config/datasource.js')

var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize)

exports.calcResult = async function (req, res) {

    const participationId = req.params.participationId;
    try {
        if (!participationId) {
            return res.status(400).json({ success: false, error: 'ID da participação não informada!' });
        }
        else {
            //Fetch participation
            let participation = await ParticipationModel.findOne({ where: { id: participationId } });
            if (!participation) {
                return res.status(401).json({ success: false, error: 'Participação não encontrada na base de dados!' });
            } else {
                console.log("Chegou aki 5");
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
                        console.log("Result: " + result);
                        // First, we create our initial object of subAreas
                        let resultObject = [];
                        // For each question found...
                        for (let i = 0; i < result.length; i++) {
                            // First we check if subArea already exist in our Object
                            if (resultObject[result[i].id] != undefined) {
                                // Lets check if the question already exist, just to prevent failures
                                if (resultObject[result[i].id].questions[result[i].question_id] != undefined) {
                                    console.log("Question already exist1");
                                } else {
                                    // If the question doesn`t exist in the mentioned subArea
                                    // Create an object with the properties: correct and time_to_answer
                                    makeQuestion(resultObject, result, i);
                                }
                            } else {
                                // If the subarea doesn`t exist, then
                                // Creates a subArea object as an empty array of questions and the name of the subArea
                                const subArea = {
                                    questions: [],
                                    name: result[i].name
                                };
                                console.log(`New question being included2: ${subArea}`);
                                resultObject[result[i].id] = subArea;
                                // Vamos verificar se a questão já existe (só para não dar algum problema grave)
                                if (resultObject[result[i].id].questions[result[i].question_id] != undefined) { // Se a questão existe na subArea mencionada
                                    // Faz nada
                                    console.log("Question already exist2");
                                } else { 
                                    // Se a questão não existe na subArea mencionada
                                    // Cria objeto questão com as propriedades correct e time_to_answer
                                   makeQuestion(resultObject, result, i);                                    
                                }
                            }
                        }
                        res.status(200).json({
                            success: true,
                            message: 'Foi',
                            fodeu: resultObject
                        })
                    })
            }
        }

    } catch (err) {
        res.status(401).json({ success: false, error: 'Erro ao buscar resultado de exame: ' + console.log(err.message) });
    }
}

async function makeQuestion(resultObject, result, i) {
    const question = {
        correct: result[i].correct,
        time_to_answer: result[i].time_to_answer
    };
    resultObject[result[i].id].questions[result[i].question_id] = question;
    return question;
}