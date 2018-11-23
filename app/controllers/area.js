var exports = module.exports = {}
var db = require('../config/datasource.js')
var Area = require('../models/area.js')(db.sequelize, db.Sequelize)

exports.findAll = async (req, res) => {
    try {
        Area.all().then((area) => {
            res.status(200).json({
                success: true,
                message: 'areas found',
                areas: area
            })
        })
    } catch (e) {
        return res.status(400).json({success: false, error: e.message})
    }
}
