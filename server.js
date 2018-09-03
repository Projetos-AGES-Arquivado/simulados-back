var express = require('express')
var app = module.exports = express();
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')

//For BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome stranger');
});

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app);
var userRoute = require('./app/routes/user.js')(app);

//Sync Database
models.sequelize.sync().then(function () {
    console.log('You\'re pretty good. Database looks fine')
}).catch(function (err) {
    console.log(err, "Something wrong is not right with the Database Update!")
});

app.listen(3000, function (err) {
    if (!err) console.log("It's alive!!!"); else console.log(err)
});
