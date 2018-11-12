const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
require('dotenv').config()

//routes
const registeration = require('./routes/registeration.js')
const articlePage = require('./routes/article')
const commentPage = require('./routes/comment')


//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//connect mongoose
mongoose.connect(`mongodb://localhost:27017/blog_${process.env.ENV_NODE}`, {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log(('You are Mongected'));
});

//routes
app.use('/blog', registeration)
app.use('/blog/articles', articlePage)
app.use('/blog/comments', commentPage)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})

module.exports = app