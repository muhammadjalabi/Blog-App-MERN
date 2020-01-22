const express = require('express');
const passport = require('passport');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser') //this will allow you to use commands like req.BODY<---

const app = express();
const config = require('./config/key')



const PORT = process.env.PORT || config.SERVER_PORT
const URI = config.MONGO_URI

//MongoDB
mongoose.connect(URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Data base connected (MongoDB)'))
  .catch(error => console.log(error))

mongoose.Promise = global.Promise;

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middleware/passport')(passport)
app.use('/api/user', require('./routes/api/user'))
app.use('/api/post', require('./routes/api/post'))

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})

