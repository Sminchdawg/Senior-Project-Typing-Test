require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const rtsIndex = require('./routes/index.router');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((error, req, response, next) => {
  if (error.name === 'ValidationError') {
    let valErrors = [];
    Object.keys(error.errors).forEach((key) => {
      valErrors.push(error.errors[key].message);
      response.status(422).send(valErrors);
    });
  }           
});         

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port: ${process.env.port}`));