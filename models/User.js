const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    ten: {
      type: String,
    },
    taiKhoan: {
      type: String,
    }, 
    matKhau: {
      type: String,
    }, 
    email: {
      type: String,
    }, 
    soDienThoai: {
      type: String,
    }, 
    diaChi: {
      type: String,
    }, 
    ngaySinh: {
      type: String
    }, 
    phanQuyen: {
      type: String,
    },
    img: {
      type: String,
    }
})

module.exports = mongoose.model('Users', UserSchema)