describe('Route POST /exam', () =>{
    it('Should create an exam', done =>{
        request.post('/exam')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                student_id: '1'
            })
            .expect(201)
            .end(function (err){
                done(err)
            })
    })
    
    it('Shouldn`t create an exam without student_id', done =>{
        request.post('/exam')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
            })
            .expect(400)
            .end(function (err){
                done(err)
            })
    })
})