const express = require('express');
const router = express.Router();
const User = require('../models/User');

// get users
router.get('/', async (req, res) => {
  // User.find((err, users) => {
  //   res.json(users);
  // })
  try {
    const users = await User.aggregate([
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'idNhanVien',
          as: 'posts'
        }
      }
    ])
    res.json(users);
  } catch (err) {
    res.json({ err: err });
  }
})

// add user
router.post('/', async (req, res) => {
  const user = new User({
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
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user)
  } catch (err) {
    res.json({ message: err });
  }
})

// delete user
router.delete('/:userId', async (req, res) => {
  try {
    const deleteUser = await User.remove({ _id: req.params.userId });
    res.json(deleteUser)
  } catch (err) {
    res.json({ message: err });
  }
})

// update user
router.patch('/:userId', async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          // taiKhoan: req.body.taiKhoan,
          // matKhau: req.body.matKhau,
          // email: req.body.email,
          // soDienThoai: req.body.soDienThoai,
          // diaChi: req.body.diaChi,
          // ngaySinh: req.body.ngaySinh,
          // phanQuyen: req.body.phanQuyen
          ...req.body
        }
      }
    );
    res.json(updateUser)
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;