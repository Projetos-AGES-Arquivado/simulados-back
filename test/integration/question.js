var db = require("../../app/config/datasource");

describe("Route GET /questions", () => {
  it("Successfully fetch the questions", done => {
    request
      .get("/questions?examId=20&lastQuestion=0&amount=10")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.questions.length).to.equal(10);
        done();
      });
  });

  it("Successfully fetch the questions with out lastQuestion and amount", done => {
    request.get("/questions?examId=20").end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.questions.length).to.equal(10);
      done();
    });
  });

  it("Exam not informed", done => {
    request.get("/questions").end((err, res) => {
      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal("Simulado não informado!");
      done();
    });
  });

  it("Exam not found", done => {
    request.get("/questions?examId=90").end((err, res) => {
      expect(res.status).to.equal(401);
      expect(res.body.error).to.equal("Simulado não informado!");
      done();
    });
  });
});
