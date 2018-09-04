var db = require('../../app/config/datasource');

describe('Sign up', () => {

    before(() => {
        db.sequelize.sync()
    })

    request.post('/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            email: "new@email.com",
            password: "passwd"
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res)
        });
})