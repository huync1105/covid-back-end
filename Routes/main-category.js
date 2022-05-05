const express = require('express');
const router = express.Router();
const MainCategory = require('../models/Main-Category');

// get data
router.get('/', async (req, res) => {
  MainCategory.find((err, users) => {
    res.json(users);
  })
})

//add data 
router.post('/', async (req, res) => {
  const Category = new MainCategory({
    ...req.body
  })
  try {
    const saveCategory = await Category.save();
    res.json(saveCategory);
  } catch (err) {
    res.json({ message: err });
  }
})

// get category by id
router.get('/:catId', async (req, res) => {
  try {
    const category = await MainCategory.findById(req.params.catId);
    res.json(category)
  } catch (err) {
    res.json({ message: err });
  }
})

// delete category
router.delete('/:catId', async (req, res) => {
  try {
    const deleteCategory = await MainCategory.remove({ _id: req.params.catId });
    res.json(deleteCategory)
  } catch (err) {
    res.json({ message: err });
  }
})

// update user
router.patch('/:catId', async (req, res) => {
  try {
    const updateCategory = await MainCategory.updateOne(
      { _id: req.params.catId },
      {
        $set: {
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