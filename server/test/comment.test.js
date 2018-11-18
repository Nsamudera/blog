const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = chai.expect;
const app = require('../app.js')

describe("Comment Test", function() {
    it("should return array of object containing all comments", function (done) {
        chai
            .request(app)
            .get("/blog/comments")
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Data retrieval success")
                expect(res.body.data).to.be.an('array')
                done()
            })
    })
    it("should return 'Comment successfully added' with a status of 201", function(done) {
        chai
            .request(app)
            .post("/blog/comments/add")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({articleId: "5bf160e83c58a01869bc4060", comment: "Testing"})
            .end(function(err, res) {
                expect(res).to.have.status(201)
                expect(res.body.message).to.equal("Comment successfully added")
                done()
            })
    })

    it("should return 'Comment successfully edited' when an comment is edited", function(done) {
        chai
            .request(app)
            .put("/blog/comments/edit")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({commentId: "5bf1672b4c4fb9225fb86740", comment: "XXXXXXX"})
            .end(function(err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Comment successfully edited")
                done()
            })
    })

    it("should return 'Comment successfully deleted' when an comment is deleted", function(done) {
        chai
            .request(app)
            .delete("/blog/comments/delete")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({commentId: "5bf1672b4c4fb9225fb86740"})
            .end(function(err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Comment successfully deleted")
                done()
            })
    })
})