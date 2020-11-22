const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  wpm: {
    type: Number,
  },
  correctWords: {
    type: Number,
  },
  incorrectWords: {
    type: Number,
  },
  userId: {
    type: String,
    required: 'userId cannot be empty',
  }
});

// TODO: Add in method to check if that is a valid user?

mongoose.model('Result', resultSchema);