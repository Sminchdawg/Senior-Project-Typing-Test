const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const blogPostSchema = new Schema({
  title: String,
  body: String,
  data: {
    type: String,
    default: Date.now()
  }
});

// Model
const blogPost = new mongoose.model('blogPost', blogPostSchema);

module.exports = blogPost;