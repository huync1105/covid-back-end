const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = Schema({
    tieuDe: {
      type: String
    },
    moTa: {
      type: String
    },
    noiDung: {
      type: String
    },
    noiDungHTML: {
      type: String
    },
    noiDungText: {
      type: String
    },
    anhBia: {
      type: String
    },
    ngayTao: {
      type: String
    },
    idDanhMuc: {
      type: Schema.Types.ObjectId,
      res: 'subcategories'
    },
    idNhanVien: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    daDuyet: {
      type: Boolean,
    },
})

module.exports = mongoose.model('Posts', PostSchema)