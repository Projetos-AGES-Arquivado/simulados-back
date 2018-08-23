var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Simulados API');
});

app.listen(3000, function () {
    console.log('Simulados API rodando na porta 3000!');
});