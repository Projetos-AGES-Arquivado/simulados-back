var express = require('express');
var models = require("./app/models");
var app = express();

//Sync database
models.sequelize.sync().then(() => {
    console.log("Simulados database is ready.");
})
.catch(function (err) {
    console.log(err, "Something went wrong while creating simulados_database.")
});

app.get('/', function (req, res) {
    res.send('Simulados API');
});

app.listen(3000, function () {
    console.log('Simulados API rodando na porta 3000!');
});