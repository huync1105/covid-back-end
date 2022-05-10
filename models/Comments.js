const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
  idNhanVien: {
    type: String
  },
  idBaiViet: {
    type: String
  },
  noiDung: {
    type: String
  },
  ngayTao: {
    type: String,
  }
})

module.exports = mongoose.model('Comments', commentSchema);