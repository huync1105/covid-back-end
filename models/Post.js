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
    trangThai: {
      type: String
    },
})

module.exports = mongoose.model('Posts', PostSchema)