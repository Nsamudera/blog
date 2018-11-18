const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const mongoose = require('mongoose')
const mongodbUri = 'mongodb://@ds157503.mlab.com:57503/blog'
require('dotenv').config()

//routes
const registeration = require('./routes/registeration.js')
const articlePage = require('./routes/article')
const commentPage = require('./routes/comment')
const decodePage = require('./routes/decode.js')


//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//connect mongoose
mongoose.connect(mongodbUri,
  {
    useNewUrlParser: true,
    auth: {
      user: process.env.mlab_user,
      password: process.env.mlab_password
    }
  });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(('You are Mongected'));
});

//routes
app.use('/blog', registeration)
app.use('/decode', decodePage)
app.use('/blog/articles', articlePage)
app.use('/blog/comments', commentPage)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})

module.exports = app