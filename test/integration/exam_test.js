var db = require('../../app/config/datasource');

describe('Route POST /exam', () => {

    before(() => {
        db.sequelize.sync()
    })

    it('should return succes, message, and an exam', done => {

        let student_id = 1

        request.post('/exam')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                student_id: student_id
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                expect(res.body.success).to.be.eql(true)
                expect(res.body.participation.student_id).to.be.eql(student_id)
                done(err);
            });
    });
})