const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require('./routes/api')

const MONGODB_URI = 'mongodb+srv://application:riotgames12@seniorproject.3bdui.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('connected');
});

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
