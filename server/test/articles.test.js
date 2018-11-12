const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp);
const expect = chai.expect;
const app = require('../app.js')

// describe("Article Page Test", function () {
//     it("should return array of object containing all article", function (done) {
//         chai
//             .request(app)
//             .get("/blog/articles")
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.message).to.equal("Data retreival sucess")
//                 expect(res.body.data).to.be.an('array')
//                 done()
//             })
//     })
// })

// describe("Article User Page Test", function () {
//     it("should return object containing a message and and array of object of all article created by a user", function (done) {
//         chai
//             .request(app)
//             .get("/blog/articles/user")
//             .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1SjU")
//             .end(function (err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.message).to.equal("Data retrieval success")
//                 expect(res.body.data).to.be.an('array')
//                 done()
//             })
//     })
    
//     it("should return 'Article successfully created' when succesfully created an article", function(done) {
//         chai
//             .request(app)
//             .post("/blog/articles/user/create")
//             //token for email@mail.com
//             .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1SjU")
//             .send({authorId: "5be971f31204aa57c8a11223", name: "Article 1", body: "This is article 1"})
//             .end(function(err, res) {
//                 expect(res).to.have.status(201)
//                 expect(res.body.message).to.equal("Article successfully created")
//                 expect(res.body).to.be.an('object')
//                 done()
//             })
//     })
    
//     it("should return 'Article successfully edited' when an article is edited", function(done) {
//         chai
//             .request(app)
//             .put("/blog/articles/user/edit")
//             .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1SjU")
//             .send({articleId: "5be971fef61e0e57fc159557", name: "Article 1X", body: "This is article 1 Edited"})
//             .end(function(err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.message).to.equal("Article successfully edited")
//                 done()
//             })
//     })
    

//     it("should return 'Article successfully delete' when article is deleted", function(done) {
//         chai
//             .request(app)
//             .del("/blog/articles/user/delete")
//             .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1SjU")
//             .send({articleId: "5be97260d63a9a5832703731"})
//             .end(function(err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body.message).to.equal("Article successfully deleted")
//                 done()
//             })

//     })
    

    //Middleware?
    // it("should return 'Invalid user' when the email is no longer in Database", function(done) {
    //     chai
    //         .request(app)
    //         .get("/blog/articles/user")
    //         .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1Sju")
    //         .end(function(err, res) {
    //             expect(res).to.have.status(400)
    //             expect(res.body.message).to.equal("Invalid user")
    //              done()
    //         })
    // })
    // it("should return 'Invalid user' when the email is no longer in Database", function(done) {
    //     chai
    //         .request(app)
    //         .post("/blog/articles/user/create")
    //         .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1Sju")
    //         .send({name: "Article 1", body: "This is article 1"})
    //         .end(function(err, res) {
    //             expect(res).to.have.status(400)
    //             expect(res.body.message).to.equal("Invalid user")
    //         })
    // })
    // it("should return 'Invalid user' when the email is no longer in Database", function(done) {
    //     chai
    //         .request(app)
    //         .put("/blog/articles/user/edit")
    //         .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1Sjiu")
    //         .send({articleId: "5be971fef61e0e57fc159557", name: "Article 1X", body: "This is article 1 Edited"})
    //         .end(function(err, res) {
    //             expect(res).to.have.status(400)
    //             expect(res.body.message).to.equal("Invalid user")
    //             done()
    //         })
    // })
        // it("should return 'Invalid user' when the email is no longer in Database", function(done) {
    //     chai
    //         .request(app)
    //         .put("/blog/articles/user/delete")
    //         .set('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmU5NGU0ZjZkMGI3NzQ0ZGMzOTAyMDkiLCJlbWFpbCI6ImVtYWlsQG1haWwuY29tIiwiYXJ0aWNsZXMiOltdLCJpYXQiOjE1NDIwMjI4NDd9._PLSVX_h3Ov5GQ760eGyp5_89Bzi1Zshtkgv6sX1Sjiu")
    //         .send({articleId: "5be971fef61e0e57fc159557", name: "Article 1X", body: "This is article 1 Edited"})
    //         .end(function(err, res) {
    //             expect(res).to.have.status(400)
    //             expect(res.body.message).to.equal("Invalid user")
    //             done()
    //         })
    // })
// })
 