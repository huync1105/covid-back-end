const mongoose = require('mongoose');
const mainCategorySchema = mongoose.Schema({
  ten: {
    type: String
  }
})

module.exports = mongoose.model('MainCategory', mainCategorySchema);
