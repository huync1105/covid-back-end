
let currentUser = {};
let users = [];
let posts = [];
let currentPage = 0;

window.addEventListener('DOMContentLoaded', () => {
  loadData();
})

function loadData() {
  getUserData(localStorage.CurrentUser)
  .then(res => {
    currentUser = res;
    // console.log("currentUser", currentUser);
    localStorage.setItem('currentUserObj', JSON.stringify(currentUser));
    document.querySelector('.profile-pic').innerHTML = `
      <div class="count-indicator">
        <img class="img-xs rounded-circle " src="${currentUser.img}" alt="">
      </div>
      <div class="profile-name">
        <h5 class="mb-0 font-weight-normal">${currentUser.ten}</h5>
        <span>${getUserPermissionName(currentUser.phanQuyen)}</span>
      </div>
    `
    document.querySelector('.navbar-profile').innerHTML = `
      <img class="img-xs rounded-circle" src="${currentUser.img}" alt="">
      <p class="mb-0 d-none d-sm-block navbar-profile-name">${currentUser.ten}</p>
      <i class="mdi mdi-menu-down d-none d-sm-block"></i>
    `
    getPostsData()
    .then(res => {
      posts = res;
      // console.log("posts", posts);
      // mergeData(users, posts);
      renderPageNav(posts)
      bindDataToTable(posts);
      posts = splitPages(posts);
    })
  })
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

function checkPermission(permission) {
  if (permission !== "PER01") {
    document.querySelectorAll('#delete-post').array.forEach(element => {
      element.style.visibility = 'hidden';
    });
  }
}

// get posts
async function getPostsData() {
  let postAPI = window.location.origin  +  '/posts';
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
  const response = await fetch(postAPI, request);
  return response.json();
}

// delete post
async function deletePostData(id) {
  let userAPI = window.location.origin  +  `/posts/${id}`;
  let request = {
    method: 'DELETE',
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

// get category list
async function getCategoryList() {
  let API = window.location.origin  +  '/subcategories';
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

function bindDataToTable(posts) {
  console.log("currentUser", currentUser);
  let data = posts.map(post => {
    return `
    <tr>
      <td>
        <img src="${post.users[0].img}" alt="image" />
        <span class="pl-2">${post.users[0].ten}</span>
      </td>
      <td> ${getUserPermissionName(post.users[0].phanQuyen)} </td>
      <td> ${post.tieuDe} </td>
      <td> ${post.ngayTao} </td>
      <td>
        ${post.daDuyet?`<div class="badge badge-outline-success">Được duyệt</div>`:`<Chờ class="badge badge-outline-warning">Chờ được duyệt</div>`}
      </td>
      <td>
        <a href="#" id="profile-dropdown" data-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>
        <div class="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
          <a href="./pages/forms/post-preview.html" class="dropdown-item preview-item" id="test-dropdown" onclick="previewPost('${post._id}')">
            <div class="preview-thumbnail">
              <div class="preview-icon">
                <i class="mdi mdi-eye text-info"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <p class="preview-subject ellipsis mb-1 text-small">Xem trước</p>
            </div>
          </a>
          <div class="dropdown-divider"></div>
          ${post.users[0].phanQuyen === currentUser.phanQuyen || currentUser.phanQuyen === 'PER01' || currentUser.phanQuyen === 'PER02'?`
          <a href="../template/pages/forms/post.html" class="dropdown-item preview-item" id="test-dropdown" onclick="createPost('${post._id}')">
            <div class="preview-thumbnail">
              <div class="preview-icon">
                <i class="mdi mdi-border-color text-info"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <p class="preview-subject ellipsis mb-1 text-small">Chỉnh sửa</p>
            </div>
          </a>
          `:''}
          <div class="dropdown-divider"></div>
          ${post.users[0].phanQuyen === currentUser.phanQuyen || currentUser.phanQuyen === 'PER01' || currentUser.phanQuyen === 'PER02'?`
          <button class="dropdown-item preview-item" id="delete-post" onclick="deletePost('${post._id}')">
            <div class="preview-thumbnail">
              <div class="preview-icon">
                <i class="mdi mdi-delete text-success"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <p class="preview-subject ellipsis mb-1 text-small">Xóa</p>
            </div>
          </button>
          `:''}
        </div>
      </td>
    </tr>
    `
  }).join('');
  document.querySelector('.posts-container').innerHTML = data;
}

function getUserPermissionName(permission) {
  if (permission === 'PER01') return 'Tổng biên tập'
  if (permission === 'PER02') return 'Biên tập'
  if (permission === 'PER03') return 'Thành viên'
}

function createPost(id) {
  localStorage.setItem('postId', id);
}

function previewPost(id) {
  localStorage.setItem('postId', id);
} 

function deletePost(id) {
  let text = "Bạn có muốn xóa bài viết này?";
  if (confirm(text) == true) {
    deletePostData(id)
    .then(res => {
      alert("Xóa thành công");
      loadData();
    })
    .catch(err => {})
  }
}

function splitPages(arr) {
  const ROWS_PER_PAGES = 10;
  let first = currentPage * ROWS_PER_PAGES;
  let last = first + ROWS_PER_PAGES;
  return arr.slice(first, last);
}

function changePage(e) {
  currentPage = e;
  loadData();
}

function renderPageNav(arr) {
  let newArr = new Array(Math.ceil(arr.length/10)).fill({});
  let prev = `
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
    </li>
  `
  let next = `
    <li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
    </li>
  `
  let data = newArr.map((ele, index) => {
    return `
      <li class="page-item"><a class="page-link" href="#" onclick="changePage(${index})">${index + 1}</a></li>
    `
  }).join('');
  document.querySelector('.pagination').innerHTML = prev + data + next;
}

