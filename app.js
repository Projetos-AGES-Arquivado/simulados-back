const express = require('express')
const app = module.exports = express();
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

//For BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Welcome stranger');
});

//Models
const models = require("./app/config/datasource");

//Routes
const authRoute = require('./app/routes/auth.js')(app);
const userRoute = require('./app/routes/user.js')(app);
require('./app/routes/answer.js')(app);

//Sync Database
/*models.sequelize.sync().then(function () {
    //Populate database
    var populate = require('./app/config/populate')
    populate.run()
    console.log('You\'re pretty good. Database looks fine')
}).catch(function (err) {
    console.log(err, "Something wrong is not right with the Database Update!")
});*/
