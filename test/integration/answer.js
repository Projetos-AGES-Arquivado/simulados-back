describe('Route POST /answer', () => {
    it('Should create an answer', done => {
        request.post('/answer')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                question_id: '1',
                participation_id: '1',
                alternative_id: '4'
            })
            .expect(201)
            .end(function (err) {
                done(err)
            })
    })

    it('Shouldn`t create an answer that already exist', done => {
        request.post('/answer')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                question_id: '1',
                participation_id: '1',
                alternative_id: '4'
            })
            .expect(400)
            .end(function (err) {
                done(err)
            })
    })

    it('Shouldn`t create an answer without question_id', done => {
        request.post('/answer')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                question_id: '',
                participation_id: '1',
                alternative_id: '4'
            })
            .expect(400)
            .end(function (err) {
                done(err)
            })
    })

    it('Shouldn`t create an answer without participation_id', done => {
        request.post('/answer')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                question_id: '1',
                participation_id: '',
                alternative_id: '4'
            })
            .expect(400)
            .end(function (err) {
                done(err)
            })
    })

    it('Shouldn`t create an answer without alternative_id', done => {
        request.post('/answer')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                question_id: '1',
                participation_id: '1',
                alternative_id: ''
            })
            .expect(400)
            .end(function (err) {
                done(err)
            })
    })
})