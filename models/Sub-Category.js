const mongoose = require('mongoose');
const SubCategorySchema = mongoose.Schema({
  ten: {
    type: String
  }
})

module.exports = mongoose.model('SubCategory', SubCategorySchema)