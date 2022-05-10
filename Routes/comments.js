const express = require('express');
const router = express.Router();
const Comment = require('../models/Comments');

// get comments
router.get('/', async (req, res) => {
  Comment.find((err, users) => {
    res.json(users);
  })
})

// add comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    ...req.body
  })
  try {
    const saveComment = await comment.save();
    res.json(saveComment);
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;