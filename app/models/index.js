const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};


db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Load models without dependencies
db.administrators = require('./administrator.js')(sequelize, Sequelize);
db.profiles = require('./profile.js')(sequelize, Sequelize);
db.students = require('./student.js')(sequelize, Sequelize);

db.students.belongsTo(db.profiles);

module.exports = db;
