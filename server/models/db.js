const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI , (error) => {
  if (!error) {
    console.log('MongoDB connection succeeded.');
  } else {
    console.log(`Error in MongoDB connection : ${JSON.stringify(error, undefined, 2)}`);
  }
});

require('./user.model');
require('./result.model');