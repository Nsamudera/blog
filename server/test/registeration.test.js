const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = chai.expect;
const app = require('../app.js')

// describe("Signup Test", function () {
//     it("should return 'Email already taken' if email is not unique", function (done) {
//         chai
//             .request(app)
//             .post("/blog/signup")
//             .send({email: "email@mail.com", password: "email"})
//             .end(function (err, res) {
//                 expect(res).to.have.status(400)
//                 expect(res.body.message).to.equal("Email already taken")
//                 done()
//             })
//     })
//     it("should return 'Password required' if password is empty", function (done) {
//         chai
//             .request(app)
//             .post("/blog/signup")
//             .send({email: "email4@mail.com", password: ""})
//             .end(function (err, res) {
//                 expect(res).to.have.status(400)
//                 expect(res.body.message).to.equal("Password required")
//                 done()
//             })
//     })

//     it("should return 'Successfully signed up' when signup is ok", function(done) {
//         chai
//             .request(app)
//             .post("/blog/signup")
//             .send({email: "email@mail.com", password: "email"})
//             .end(function (err, res) {
//                 expect(res).to.have.status(201)
//                 expect(res.body.message).to.equal("Successfully signed up")
//                 done()
//             })
//     })
// })

// describe("Sign in Tests:", function() {
//     it("should return 'User not found' when email is not in database", function(done) {
//         chai
//             .request(app)
//             .post('/blog/signin')
//             .send({email: "invalid@mail.com", password: "password"})
//             .end(function (err, res) {
//                 expect(res).to.have.status(400)
//                 expect(res.body.message).to.equal("User not found")
//                 done()
//             })
//     })
//     it("should return 'Password invalid' when password is incorrect", function(done) {
//         chai
//             .request(app)
//             .post('/blog/signin')
//             .send({email: "email@mail.com", password: "wrong"})
//             .end(function (err, res) {
//                 expect(res).to.have.status(400)
//                 expect(res.body.message).to.equal("Password invalid")
//                 done()
//             })
//     })
//     it("should return 'Successfully logged in' when password is correct", function(done) {
//         chai
//             .request(app)
//             .post('/blog/signin')
//             .send({email: "email@mail.com", password: "email"})
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.message).to.equal("Successfully logged in")
//                 done()
//             })
//     })
// })