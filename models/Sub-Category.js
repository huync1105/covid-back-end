const mongoose = require('mongoose');
const SubCategorySchema = mongoose.Schema({
  ten: {
    type: String
  },
  ngayTao: {
    type: String
  }
})

module.exports = mongoose.model('SubCategory', SubCategorySchema)