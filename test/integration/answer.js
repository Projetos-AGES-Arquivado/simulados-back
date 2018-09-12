var db = require('../../app/config/datasource');

describe('Route POST /answer', () => {

    before(() => {
        db.sequelize.sync()
    });

      request.post('/answer')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
            question_id: "1234",
            participation_id: "12345",
            alternative_id: "123456"
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res)
        });

    //     var newAnswer = {
    //         answer: {
    //             question_id: "1234",
    //             participation_id: "12345",
    //             alternative_id: "123456"
    //         }
    //       };
    
    //   it('responds with JSON', done => {
    //     request(app)
    //       .post('/answer')
    //       .type('form')
    //       .send(newAnswer)
    //       .expect('Content-Type', /json/)
    //       .expect(200, done);
    //   });
    
    //   it('adds the new answer to the database', done => {
    //     request(app)
    //       .post('/answer')
    //       .type('form')
    //       .send(newAnswer)
    //       .end((err, res) => {
    //         np('answer').select().then(answer => {
    //           expect(answer).to.have.lengthOf(4);
    //           expect(answer).to.deep.include(newAnswer.answer);
    //           done();
    //         });
    //       });
    //   });
});