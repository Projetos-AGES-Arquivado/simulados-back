"use strict";

var path = require("path");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);
var json = require('./db/populate.json')

const dir = __dirname+"/../models/";

const populate = {
    run: function () {
        Object.keys(json).map((table)=>{
            let model = sequelize.import(path.join(dir, table));
            model.bulkCreate(json[table])
        })
    }
}

module.exports = populate