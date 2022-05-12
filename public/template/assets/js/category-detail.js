const categoryName = document.querySelector('#category-title');
const categoryDate = document.querySelector('#category-date');
let categoryId = localStorage.categoryId;
let category = {};

window.addEventListener("DOMContentLoaded", () => {
  loadData();
})

function loadData() {
  getUserData();
  if (categoryId) {
    getCategoryById(categoryId)
    .then(res => {
      category = res;
      console.log("category", category);
      categoryName.value = category.ten;
      categoryDate.value = category.ngayTao;
    })
  }
}

function getUserData() {
  user = JSON.parse(localStorage.currentUserObj);
  // console.log("user", user);
  document.querySelector('.profile-pic').innerHTML = `
    <div class="count-indicator">
      <img class="img-xs rounded-circle " src="../../assets/images/faces/face25.jpg" alt="">
    </div>
    <div class="profile-name">
      <h5 class="mb-0 font-weight-normal">${user.ten}</h5>
      <span>${getPermission(user.phanQuyen)}</span>
    </div>
  `
  document.querySelector('.navbar-profile').innerHTML = `
    <img class="img-xs rounded-circle" src="../../assets/images/faces/face25.jpg" alt="">
    <p class="mb-0 d-none d-sm-block navbar-profile-name">${user.ten}</p>
    <i class="mdi mdi-menu-down d-none d-sm-block"></i>
  `
}

function getPermission(permission) {
  if (permission === 'PER01') return 'Tổng biên tập'
  if (permission === 'PER02') return 'Biên tập'
  if (permission === 'PER03') return 'Thành viên'
}

// get category by id
async function getCategoryById(id) {
  let API = window.location.origin  +  `/subcategories/${id}`;
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
  const response = await fetch(API, request);
  return response.json();
}

// add category
async function addCategory(data) {
  let API = window.location.origin  +  `/subcategories`;
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
  const response = await fetch(API, request);
  return response.json();
}

// update category
async function updateCategory(data, id) {
  let API = window.location.origin  +  `/subcategories/${id}`;
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
  const response = await fetch(API, request);
  return response.json();
}

function setData() {
  let data = {
    ten: categoryName.value,
    ngayTao: categoryDate.value,
  }
  return data;
}

function saveData() {
  if (categoryId) {
    updateCategory(setData(), categoryId)
    .then(res => {
      alert("Cập nhật thành công");
    })
  } else {
    addCategory(setData())
    .then(res => {
      alert("Thêm danh mục mới thành công");
      location.pathname = 'template/pages/category/category.html';
    })
  }
}