const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = chai.expect;
const app = require('../app.js')

describe("Comment Test", function() {
    it("should return array of object containing all comments", function (done) {
        chai
            .request(app)
            .get("/blog/articles")
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body.message).to.equal("Data retreival sucess")
                expect(res.body.data).to.be.an('array')
                done()
            })
    })
})