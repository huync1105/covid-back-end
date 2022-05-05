const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// get users
router.get('/', async (req, res) => {
  Post.find((err, users) => {
    res.json(users);
  })
})

// add user
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

// get user by id
router.get('/:postId', async (req, res) => {
  try {
    const user = await User.findById(req.params.postId);
    res.json(user)
  } catch (err) {
    res.json({ message: err });
  }
})

// delete user
router.delete('/:postId', async (req, res) => {
  try {
    const deleteUser = await Post.remove({ _id: req.params.postId });
    res.json(deleteUser)
  } catch (err) {
    res.json({ message: err });
  }
})

// update user
router.patch('/:postId', async (req, res) => {
  try {
    const updateUser = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: {
          tieuDe: req.body.tieuDe,
          moTa: req.body.moTa,
          noiDung: req.body.noiDung,
          anhBia: req.body.anhBia,
          ngayTao: req.body.ngayTao,
          idDanhMuc: req.body.idDanhMuc,
          idNhanVien: req.body.idNhanVien,
          trangThai: req.body.trangThai
        }
      }
    );
    res.json(updateUser)
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;