const express = require('express');
const router = express.Router();
const SubCategory = require('../models/Sub-Category');

// get data
router.get('/', async (req, res) => {
  SubCategory.find((err, users) => {
    res.json(users);
  })
})

//add data 
router.post('/', async (req, res) => {
  const Category = new SubCategory({
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
    const category = await SubCategory.findById(req.params.catId);
    res.json(category)
  } catch (err) {
    res.json({ message: err });
  }
})
// router.get('/:catId', async (req, res) => {
//   try {
//     const category = await SubCategory.findById(
//       {_id: req.params.catId},
//       {
//         $lookup: {
//           from: 'Posts',
//           localField: '_id',
//           foreignField: 'idDanhMuc',
//           as: 'listBaiViet'
//         }
//       }
//       );
//     res.json(category)
//   } catch (err) {
//     res.json({ message: err });
//   }
// })

// delete category
router.delete('/:catId', async (req, res) => {
  try {
    const deleteCategory = await SubCategory.remove({ _id: req.params.catId });
    res.json(deleteCategory)
  } catch (err) {
    res.json({ message: err });
  }
})

// update user
router.patch('/:catId', async (req, res) => {
  try {
    const updateCategory = await SubCategory.updateOne(
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
