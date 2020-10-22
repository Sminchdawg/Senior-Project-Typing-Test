/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express = require('express');

const router = express.Router();

const blogPost = require('../models/blogPost');

router.get('/', (req, res) => {
  blogPost.find({  })
    .then((data) => {
      console.log('Data: ', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('Error: ', error);
    });
})

module.exports = router;