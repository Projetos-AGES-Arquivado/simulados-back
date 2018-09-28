var app = require('./app')

app.listen(3000, function (err) {
    if(err)
        return new Error(err)
})
