const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuscom = new Schema({
  idBaiViet: { type: Schema.ObjectId },
  noiDung: { type: String },
  ngayTao: { type: String },
})

module.exports = mongoose.model('Cuscoms', cuscom)