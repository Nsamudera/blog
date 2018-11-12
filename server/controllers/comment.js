//Model
const Comment = require('../models/comment.js')

class Controller{
    static getAllComments(req, res) {
        Comment
            .find()
            .populate("author")
            .then((data) => {
                res.status(200).json({message: 'Data retreival sucess', data:data})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({message: err, note: "See console for details"})
            })


    }
}

module.exports = Controller