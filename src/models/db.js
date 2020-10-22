const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (error) => {
  console.log(process.env.MONGODB_URI);
  if (!error) {
    console.log('MongoDB connection successful');
  } else {
    console.log(`Error in MongoDB connection: ${JSON.stringify(error, undefined, 2)}`);
  }
});
