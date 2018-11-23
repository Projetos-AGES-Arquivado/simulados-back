var exports = (module.exports = {})
var db = require('../config/datasource.js')

var ParticipationModel = require('../models/participation.js')(
  db.sequelize,
  db.Sequelize,
)

/**
 * This function receives data from the client, calculate the results of a given exam,
 * builds an object of it and returns it back to the client.
 * @param {*request} req
 * @param {*responde} res
 */
exports.calcResult = async function(req, res) {
  const participationId = req.params.participationId
  try {
    if (!participationId) {
      return res
        .status(400)
        .json({ success: false, error: 'ID da participação não informada!' })
    } else {
      // Fetch the participation
      let participation = await ParticipationModel.findOne({
        where: { id: participationId },
      })
      if (!participation) {
        return res
          .status(401)
          .json({
            success: false,
            error: 'Participação não encontrada na base de dados!',
          })
      } else {
        let queryQuestions = `SELECT DISTINCT subA.name as subName, areas.name as areaName,
                                    ans.question_id as id, ans.time_to_answer, alt.correct
                            FROM answers ans 
                            INNER JOIN participations part
                                ON ans.participation_id = part.id
                            INNER JOIN questions quest
                                ON ans.question_id = quest.id
                            INNER JOIN alternatives alt
                                ON quest.id = alt.id 
                            INNER JOIN subareas subA
                                ON quest. subarea_id = subA.id
                            INNER JOIN areas
                                ON subA.area_id = areas.id
                            Where part.id = ${participationId}
                            order by ans.question_id
                            ;`

        let questions = await db.sequelize.query(queryQuestions, {
          type: db.sequelize.QueryTypes.SELECT,
        })

        res.status(200).json({
          success: true,
          message: 'Resultado buscado com sucesso!',
          result: questions,
        })
      }
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Erro ao buscar resultado de exame: ' + console.log(err.message),
    })
  }
}

exports.questionDetail = async function(req, res) {
  const questionId = req.params.questionId
  const participationId = req.params.participationId
  try {
    if (!participationId) {
      return res
        .status(400)
        .json({ success: false, error: 'ID da participação não informado!' })
    }
    if (!questionId) {
      return res
        .status(400)
        .json({ success: false, error: 'ID da questão não informado!' })
    } else {
      let participation = await ParticipationModel.findOne({
        where: { id: participationId },
      })
      if (!participation) {
        return res
          .status(401)
          .json({
            success: false,
            error: 'Participação não encontrada na base de dados!',
          })
      } else {
        let query = `SELECT DISTINCT q.statement, q.comment, 
                                q.studyMaterials, al.description
                                FROM participations p
                                INNER JOIN answers aw 
                                    ON p.id = aw.participation_id
                                INNER JOIN questions q
                                    ON aw.question_id = q.id
                                INNER JOIN alternatives al
                                    ON q.id = al.question_id
                                WHERE 
                                    p.id = ${participationId} AND 
                                    q.id = ${questionId} AND
                                    al.correct = 1
                            ;`

        let questionDetail = await db.sequelize.query(query, {
          type: db.sequelize.QueryTypes.SELECT,
        })

        res.status(200).json({
          success: true,
          message: 'Detalhes da questão buscados com sucesso!',
          result: questionDetail,
        })
      }
    }
  } catch (err) {
    res.status(401).json({
      success: false,
      error: 'Erro ao buscar os detalhes da questão: ' + console.log(err.message),
    })
  }
}
