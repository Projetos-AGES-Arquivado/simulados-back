var exports = module.exports = {}
var db = require('../config/datasource.js')

var ParticipationModel = require('../models/participation.js')(db.sequelize, db.Sequelize)

exports.calcResult = async function (req, res) {
    
    const participationId = req.params.participationId;
    console.log("AKI " + participationId);
    try{
        if (!participationId) {
            console.log("Chegou aki 1");
            return res.status(400).json({ success: false, error: 'ID da participação não informada!' });
        }
        else {
            console.log("Chegou aki 2");
            //Fetch participation
            let participation = await ParticipationModel.findOne({ where: { id: participationId } });
            console.log("Chegou aki 3");
            if (!participation) {
                console.log("Chegou aki 4");
                return res.status(401).json({ success: false, error: 'Participação não encontrada na base de dados!' });
            } else {
                console.log("Chegou aki 5");
                let query = `SELECT subA.name, ans.question_id, ans.time_to_answer, alt.correct
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
                console.log("Chegou aki 6"); 
                
                let result = await db.sequelize
                    .query(query, { type: db.sequelize.QueryTypes.SELECT })
                    .then(result => {
                        console.log("Result: " + result);
                        let returnObject;
                        for(let i=0; i<result.length; i++) {
                            returnObject[result[i].name].questoes[result[i].question_id].correct = result[i].correct;
                            returnObject[result[i].name].questoes[result[i].question_id].time_to_answer = result[i].time_to_answer;
                        }
                        // console.log("returnObject: " + returnObject);
                    })

                    // for(let i=0; i<result.length; i++) {
                    //     console.log(result[i].name);
                    //     console.log(result[i].question_id);
                    //     console.log(result[i].time_to_answer);
                    //     console.log(result[i].correct);
                    // }
                    

                //console.log("Result: "+ result);
                // let returnObject;

                // for(let i=0; i<result.length; i++) {
                //     returnObject[result[i].name].[result[i].question_id].hit = result[i].correct;
                //     returnObject[result[i].name].[result[i].question_id].time = result[i].time_to_answer;
                // }
                res.status(200).json({
                    success: true,
                    message: 'Foi'
                })
            }     
        }
        
    } catch (err) {
        res.status(401).json({ success: false, error: 'Ocorreu um erro ao buscar resultado de exame: ' + console.log(err.message)});
    }
}