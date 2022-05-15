const userId = document.querySelector('#user-id');
const userFullName = document.querySelector('#user-fullname');
const userName = document.querySelector('#user-name');
const userPassword = document.querySelector('#user-password');
const userEmail = document.querySelector('#user-email');
const userPhone = document.querySelector('#user-phone');
const userAddress = document.querySelector('#user-address');
const userDate = document.querySelector('#user-date');
const userPermission = document.querySelector('#form-select');
const userImg = document.querySelector('#user-img');
let currentUserId = "";
let currentUser = {};
let user = {};
let usersArr = [];
let permissionList = [
  {
    id: 'PER01',
    ten: 'Tổng biên tập'
  },
  {
    id: 'PER02',
    ten: 'Biên tập viên'
  },
  {
    id: 'PER03',
    ten: 'Thành viên'
  },
];

window.addEventListener("DOMContentLoaded", () => {
  loadData();
})

function loadData() {
  getUsers()
  .then(users => {
    usersArr = users.map(user => user.email);
    // console.log("usersArr", usersArr);
  })
  getUserAdminData()
  // Lấy userId từ input
  currentUserId = localStorage.currentUserId;
  // console.log("currentUserId", currentUserId);
  if (currentUserId) {
    getUserData(currentUserId)
    .then(res => {
      user = res;
      // console.log(user);
      bindDataToInput(user)
    })
  }
  getUserData(localStorage.CurrentUser)
  .then(res => {
    currentUser = res;
    // console.log("currentUser",currentUser);
  })
  bindDropDown();
}

function getUserAdminData() {
  user = JSON.parse(localStorage.currentUserObj);
  // console.log("user", user);
  document.querySelector('.profile-pic').innerHTML = `
    <div class="count-indicator">
      <img class="img-xs rounded-circle " src="${user.img}" alt="">
    </div>
    <div class="profile-name">
      <h5 class="mb-0 font-weight-normal">${user.ten}</h5>
      <span>${getPermission(user.phanQuyen)}</span>
    </div>
  `
  document.querySelector('.navbar-profile').innerHTML = `
    <img class="img-xs rounded-circle" src="${user.img}" alt="">
    <p class="mb-0 d-none d-sm-block navbar-profile-name">${user.ten}</p>
    <i class="mdi mdi-menu-down d-none d-sm-block"></i>
  `
}

function getPermission(permission) {
  if (permission === 'PER01') return 'Tổng biên tập'
  if (permission === 'PER02') return 'Biên tập'
  if (permission === 'PER03') return 'Thành viên'
}


// get user by id
async function getUserData(id) {
  let userAPI = window.location.origin  +  `/users/${id}`;
  let request = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify()
  }
  const response = await fetch(userAPI, request);
  return response.json();
}

// get user by id
async function getUsers() {
  let userAPI = window.location.origin  +  `/users`;
  let request = {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify()
  }
  const response = await fetch(userAPI, request);
  return response.json();
}

// truyen data vao input
function bindDataToInput(user) {
  checkPermission(user.phanQuyen)
  if (user._id) {
    userFullName.value = user.ten;
    userPermission.value = user.phanQuyen;
    userDate.value = user.ngaySinh;
    userAddress.value = user.diaChi;
    userPhone.value = user.soDienThoai;
    userEmail.value = user.email;
    userPassword.value = user.matKhau;
    userName.value = user.taiKhoan;
    userImg.value = user.img;
    document.querySelector('.user-img').innerHTML = `
      <img class="img-fluid rounded-circle mb-1" src="${user.img}" alt="..." style="max-width: 150px; max-height: 150px; width: 150px; height: 150px">
    ` 
  } else {
    // userPermission.value = user.phanQuyen;
    userFullName.value = "";
    userDate.value = "";
    userAddress.value = "";
    userPhone.value = "";
    userEmail.value = "";
    userPassword.value = "";
    userName.value = "";
  }
}

// truyen data vao dropdown
function bindDropDown() {
  let data = permissionList.map(ele => {
    return `
      <option value="${ele.id}">${ele.ten}</option>
    `
  }).join('')
  userPermission.innerHTML = data;
}

function checkPermission(permission) {
  if (permission !== "PER01") {
    userPassword.type = "password"
  } 
}

// add users
async function addUser(data) {
  let userAPI = window.location.origin  +  `/users`;
  let request = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }
  const response = await fetch(userAPI, request);
  return response.json();
}

// update user
async function updateUser(data, id) {
  let userAPI = window.location.origin  +  `/users/${id}`;
  let request = {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  }
  const response = await fetch(userAPI, request);
  return response.json();
}

function setData() {
  let data = {
    ten: userFullName.value,
    taiKhoan: userName.value,
    matKhau: userPassword.value,
    email: userEmail.value,
    soDienThoai: userPhone.value,
    diaChi: userAddress.value,
    ngaySinh: userDate.value,
    phanQuyen: userPermission.value,
    img: userImg.value || 'https://i.pinimg.com/736x/57/fb/31/57fb3190d0cc1726d782c4e25e8561e9.jpg',
  }
  return data;
}

function saveUser() {
  // console.log(user);
  // console.log(setData());
  let currentUserId = localStorage.currentUserId;
  if (currentUserId) {
    if (setData().email === user.email) {
      updateUser(setData(),currentUserId)
      .then(res => {
        alert('Lưu thành công')
      })
      .catch(err => console.log(err))
      .finally()
    } else {
      alert('Sai email');
    }
  } else {
    if (validateData(setData()) && checkEmail(setData())) {
      addUser(setData())
      .then(res => {
        alert('Thêm tài khoản thành công');
        bindDataToInput(res);
        location.pathname = '/template/pages/user/User.html'
      });
    }
  }
}

document.querySelector('.file-upload-browse').addEventListener('click', () => {
  document.querySelector('.user-img').innerHTML = userImg.value?`
    <img class="img-fluid rounded-circle mb-1" src="${userImg.value}" alt="..." style="max-width: 150px; max-height: 150px; width: 150px; height: 150px">
  `:`
    <img class="img-fluid rounded-circle mb-1" src="../../assets/images/faces/face25.jpg" alt="..." style="max-width: 115px; max-height: 150px; width: 150px; height: 150px">
  `
})

function validateData(data) {
  if (!checkValue(data.ten)) {
    alert('Vui lòng nhập họ tên');
    return false;
  } 
  else if (!checkValue(data.taiKhoan)) {
    alert('Vui lòng nhập tên đăng nhập');
    return false;
  }
  else if (!checkValue(data.matKhau)) {
    alert('Vui lòng nhập mật khẩu');
    return false;
  }
  else if (!checkValue(data.email)) {
    alert('Vui lòng nhập email');
    return false;
  }
  else if (!checkValue(data.phanQuyen)) {
    alert('Vui lòng nhập chức vụ');
    return false;
  }
  else if (!checkValue(data.soDienThoai)) {
    alert('Vui lòng nhập số điện thoại');
    return false;
  }
  else if (!checkValue(data.ngaySinh)) {
    alert('Vui lòng nhập ngày sinh');
    return false;
  }
  else if (!checkValue(data.diaChi)) {
    alert('Vui lòng nhập địa chỉ');
    return false;
  }
  return true;
  // else {
  // }
}

function checkValue(value) {
  if (value.trim().toString() === '' || value == null || value == undefined) {
    return false
  } else {
    return true
  }
}

function checkEmail(data) {
  if (usersArr.includes(data.email)) {
    alert('Email đã được sử dụng');
    return false;
  } else {
    return true;
  }
}