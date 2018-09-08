const config = require('../config/config');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.username, config.password, {'dialect':config.production.dialect});

module.exports = (sequelize, Sequelize) => {

    var Participation = sequelize.define('participation', {
        id: {autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER},
        participation_date: {type: Sequelize.DATE},
        time_of_conclusion: {type: Sequelize.TIME}
    });

    Participation.belongsTo(sequelize.import('./exam'))
    Participation.belongsTo(sequelize.import('./user'))

    return Participation;
}
