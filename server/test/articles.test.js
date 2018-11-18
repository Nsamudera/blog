const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = chai.expect;
const app = require('../app.js')

describe("Article Page Test", function () {
    it("should return array of object containing all article", function (done) {
        chai
            .request(app)
            .get("/blog/articles")
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Data retrieval success")
                expect(res.body.data).to.be.an('array')
                done()
            })
    })
})

describe("Article User Page Test", function () {
    it("should return object containing a message and and array of object of all article created by a user", function (done) {
        chai
            .request(app)
            .get("/blog/articles/user")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Data retrieval success")
                expect(res.body.data).to.be.an('array')
                done()
            })
    })
    
    it("should return 'Article successfully created' when succesfully created an article", function(done) {
        chai
            .request(app)
            .post("/blog/articles/user/create")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({authorId: "5beac344ba6e6c3737aaacf6", name: "From Test", body: "This is From Test"})
            .end(function(err, res) {
                expect(res).to.have.status(201)
                expect(res.body.message).to.equal("Article successfully created")
                expect(res.body).to.be.an('object')
                done()
            })
    })

    it("should return 'You are not authorized to create this article' when token does not match userArticle inputted", function(done) {
        chai
            .request(app)
            .post("/blog/articles/user/create")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({authorId: "5beac42262f7973799433c74", name: "From Test", body: "This is From Test"})
            .end(function(err, res) {
                expect(res).to.have.status(403)
                expect(res.body.message).to.equal("You are not authorized to create this article")
                expect(res.body).to.be.an('object')
                done()
            })
    })
    
    it("should return 'Article successfully edited' when an article is edited", function(done) {
        chai
            .request(app)
            .put("/blog/articles/user/edit")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({articleId: "5bf160e83c58a01869bc4060", name: "Article 1X", body: "This is article 1 Edited"})
            .end(function(err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Article successfully edited")
                done()
            })
    })
    
    it("should return 'Article successfully delete' when article is deleted", function(done) {
        chai
            .request(app)
            .del("/blog/articles/user/delete")
            .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmVhYzM0NGJhNmU2YzM3MzdhYWFjZjYiLCJlbWFpbCI6ImJvYkBtYWlsLmNvbSIsImFydGljbGVzIjpbIjViZWFjM2I4NjJmNzk3Mzc5OTQzM2M3MSIsIjViZWFjM2U0NjJmNzk3Mzc5OTQzM2M3MyIsIjViZWNlNzRlMTFmODNkM2YxYWZjM2IxNiJdLCJuYW1lIjoiQm9iIiwiaWF0IjoxNTQyNTQ0ODE1fQ.SS26K4ZuDgmm7a8c76yoHspYvyv574ENr8A8WuYgC1w")
            .send({articleId: "5bf1627a99773c1a07717a2d"})
            .end(function(err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Article successfully deleted")
                done()
            })
        })
})