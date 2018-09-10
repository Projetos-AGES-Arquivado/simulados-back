var exports = module.exports = {}
var db = require('../config/datasource.js');
var User = require('../models/user.js')(db.sequelize, db.Sequelize);
var Exam = require('../models/exam.js')(db.sequelize, db.Sequelize);
var Participation = require('../models/participation')(db.sequelize, db.Sequelize);
var bCrypt = require('bcrypt-nodejs');
var validator = require('validator');

exports.create = async function (req, res) {
    const body = req.body;

    if (!body.userId) {
        return res.status(400).json({success: false, error: 'You must inform user id'});
    } else {
        try {
            User.findById(body.userId).then((user) => {
                if (!user) {
                    return res.status(400).json({success: false, error: 'User not found'});
                } else {
                    let date = new Date()
                    //Create exam
                    Exam.create({aob_exam: true, aob_exam_year: date.getFullYear()}).then((exam) => {
                        Participation.create(
                            {
                                participation_date:date,
                                time_of_conclusion:null,
                                userId:user.id,
                                examId:exam.id,
                            })
                            .then((participation) => {
                                res.status(201).json({
                                    success: true,
                                    message: 'Successfully created new exam',
                                    participation: participation.toJSON()
                                })
                        })
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
};
