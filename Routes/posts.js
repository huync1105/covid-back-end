const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get posts
router.get('/', async (req, res) => {
  Post.find((err, users) => {
    res.json(users);
  })
})

// add post
router.post('/', async (req, res) => {
  const user = new Post({
    ...req.body
  })
  try {
    const saveUser = await user.save();
    res.json(saveUser);
  } catch (err) {
    res.json({ message: err });
  }
})

// get post by id
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post)
  } catch (err) {
    res.json({ message: err });
  }
})

// delete post
router.delete('/:postId', async (req, res) => {
  try {
    const deletePost = await Post.remove({ _id: req.params.postId });
    res.json(deletePost)
  } catch (err) {
    res.json({ message: err });
  }
})

// update Post
router.patch('/:postId', async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          ...req.body,
        }
      }
    );
    res.json(updatePost)
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;