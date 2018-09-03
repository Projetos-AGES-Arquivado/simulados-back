describe('Routes Auth', () => {
    //const User = app.datasource.models.Users;

    describe('Route GET /signin', () => {
        it('should return succes, message, user and token', done => {
            
            request
            .get('/signin')
            .end((err, res) => {                
                // expect(res.body).to.have.all.keys(
                //     'message',
                //     'user',
                //     'token'
                // );
                //expect(res.body).toBe.be.eql(defaultBook.name);
                // expect(res.should.have.status(200));
                // expect(res.body.should.be.a('object'));
                // expect(res.body.should.have.property('message')).eql('Successfully login');
                // expect(res.body.should.have.property('user'));
                // expect(res.body.should.have.property('token'))
                // done(err);
                done(err);
            });
        });
    });

});

/** CENARIO PRIMARIO
 describe('Routes Books', () => {

    describe('Route GET /signin', () => {
        it('should return succes, message, user and token', done => {

        });
    });

});
 */
