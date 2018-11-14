var exports = module.exports = {}
var db = require('../config/datasource.js')
var Alternative = require('../models/alternative')(db.sequelize, db.Sequelize)

exports.findAll = async (req, res) => {
    try {
        Alternative.all().then((alternatives) => {
            res.status(200).json({
                success: true,
                message: 'Alternatives found',
                alternatives: alternatives
            })
        })
    } catch (e) {
        return res.status(400).json({success: false, error: e.message})
    }
}