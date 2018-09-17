"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load modules without dependencies
db.administrators = require('../models/administrator.js')(sequelize, Sequelize);
db.profiles = require("../models/profile")(sequelize, Sequelize);
db.professors = require("../models/professor.js")(sequelize, Sequelize);
db.areas = require("../models/area.js")(sequelize, Sequelize);
db.practise_exams = require("../models/practise_exam.js")(sequelize, Sequelize);

// Load modules with dependencies
db.students = require("../models/student.js")(sequelize, Sequelize);
db.subareas = require("../models/subarea.js")(sequelize, Sequelize);
db.professor_subareas = require("../models/professor_subareas.js")(sequelize, Sequelize);
db.coordinators = require("../models/coordinator.js")(sequelize, Sequelize);
db.questions = require("../models/question.js")(sequelize, Sequelize);
db.alternatives = require("../models/alternative.js")(sequelize, Sequelize);
db.participations = require("../models/participation.js")(sequelize, Sequelize);
db.answers = require("../models/answer.js")(sequelize, Sequelize);
db.practiseexam_questions = require("../models/practiseexam_questions.js")(sequelize, Sequelize);

//Student
db.profiles.hasMany(db.students);
db.students.belongsTo(db.profiles);

//Participations
db.students.hasMany(db.participations);
db.practise_exams.hasMany(db.participations);
db.participations.belongsTo(db.students);
db.participations.belongsTo(db.practise_exams);

//Answers
db.participations.hasMany(db.answers);
db.questions.hasMany(db.answers);
db.alternatives.hasMany(db.answers);
db.answers.belongsTo(db.participations, {foreignKey: 'participation_id'});
db.answers.belongsTo(db.questions, {foreignKey: 'question_id'});
db.answers.belongsTo(db.alternatives, {foreignKey: 'alternative_id'});

//Alternatives
db.questions.hasMany(db.alternatives);
db.alternatives.belongsTo(db.questions);

//PractiseExam_Questions
db.practise_exams.hasMany(db.practiseexam_questions);
db.questions.hasMany(db.practiseexam_questions);
db.practiseexam_questions.belongsTo(db.practise_exams);
db.practiseexam_questions.belongsTo(db.questions);

//Questions
db.coordinators.hasMany(db.questions);
db.professors.hasMany(db.questions);
db.subareas.hasMany(db.questions);
db.questions.belongsTo(db.coordinators);
db.questions.belongsTo(db.professors);
db.questions.belongsTo(db.subareas);

//Coordinators
db.areas.hasMany(db.coordinators);
db.coordinators.belongsTo(db.areas);

//Subareas
db.areas.hasMany(db.subareas);
db.subareas.belongsTo(db.areas);

//Professor_subareas
db.professors.hasMany(db.professor_subareas);
db.subareas.hasMany(db.professor_subareas);
db.professor_subareas.belongsTo(db.professors);
db.professor_subareas.belongsTo(db.subareas);

module.exports = db;