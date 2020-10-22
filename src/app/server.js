/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');
const PORT = process.env.PORT || 8080;
const routes = require('./routes/api');
const MONGODB_URI = 'mongodb+srv://application:riotgames12@seniorproject.3bdui.mongodb.net/<dbname>?retryWrites=true&w=majority';


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(MONGODB_URI || 'mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const app = express();
app.use(require('express-session')({
  secret: 'Hello',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connection.on('connected', () => {
  console.log('connected');
});

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
