const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
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
    anhBia: {
      type: String
    },
    ngayTao: {
      type: String
    },
    idDanhMuc: {
      type: String
    },
    idNhanVien: {
      type: String
    },
    daDuyet: {
      type: Boolean,
    },
})

module.exports = mongoose.model('Posts', PostSchema)