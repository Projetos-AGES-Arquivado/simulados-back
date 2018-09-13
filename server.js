var app = require('./app');

app.listen(3000, function (err) {
    if (!err) console.log("It's alive!!!"); else console.log(err)
});
