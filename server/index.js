const express = require('express');
const passport = require('passport');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser') //this will allow you to use commands like req.BODY<---
const config = require('./config/key')

const PORT = process.env.PORT || config.SERVER_PORT
const URI = config.MONGO_URI


//MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true, useUnifiedTopology: true,
  useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('Data base connected'))
  .catch(error => console.log(error))


//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})

