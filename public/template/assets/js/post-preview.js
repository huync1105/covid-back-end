const commentContent = document.querySelector('#comment-content');
let post = {};
let user = {};
let users = [];
let comments = [];

window.addEventListener('DOMContentLoaded', () => {
  loadData();
})

function loadData() {
  getUserData();
  getPostData(localStorage.postId)
  .then(res => {
    post = res;
    // console.log("post", post);
    renderPost(post);
  })
  getUsers()
  .then(res => {
    users = res;
    // console.log("users", users);
  })
  getComments()
  .then(res => {
    comments = res;
    // console.log("comments", comments);
    mergeData(users, comments, localStorage.postId);
  })
}

function getUserData() {
  user = JSON.parse(localStorage.currentUserObj);
  // console.log("user", user);
  document.querySelector('.profile-pic').innerHTML = `
    <div class="count-indicator">
      <img class="img-xs rounded-circle " src="../../assets/images/faces/face25.jpg" alt="">
    </div>
    <div class="profile-name">
      <h5 class="mb-0 font-weight-normal">${user.taiKhoan}</h5>
      <span>${getPermission(user.phanQuyen)}</span>
    </div>
  `
  document.querySelector('.navbar-profile').innerHTML = `
    <img class="img-xs rounded-circle" src="../../assets/images/faces/face25.jpg" alt="">
    <p class="mb-0 d-none d-sm-block navbar-profile-name">${user.taiKhoan}</p>
    <i class="mdi mdi-menu-down d-none d-sm-block"></i>
  `
}

function getPermission(permission) {
  if (permission === 'PER01') return 'Tổng biên tập'
  if (permission === 'PER02') return 'Biên tập'
  if (permission === 'PER03') return 'Thành viên'
}

// get post by id
async function getPostData(id) {
  let postAPI = window.location.origin  +  `/posts/${id}`;
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

function renderPost(post) {
  let data = `
    <header class="mb-4">
      <h1 class="fw-bolder mb-1">
        ${post.tieuDe}
      </h1>
      <div class="text-muted fst-italic mb-2">${post.ngayTao}</div>
    </header>
    <figure class="mb-4"><img class="img-fluid rounded"
        src="${post.anhBia}" alt="..." /></figure>
    <section class="mb-5">
      ${post.noiDungHTML}
    </section>
  `
  document.querySelector('.post-content').innerHTML = data;
  document.querySelector('.status').innerHTML = post.daDuyet ? `<div class="badge badge-outline-success">Được duyệt</div>` : `<div class="badge badge-outline-warning">Đang duyệt</div>`
}

function test() {
  let toSpeak = new SpeechSynthesisUtterance(post.noiDungText);
  toSpeak.lang = 'vi-VI';
  let synth = window.speechSynthesis;
  synth.speak(toSpeak)
}

async function getComments() {
  let API = window.location.origin  +  `/comments`;
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

async function addComments(data) {
  let API = window.location.origin  +  `/comments`;
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

async function getUsers() {
  let API = window.location.origin  +  `/users`;
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

function mergeData(users, comments, postId) {
  comments.forEach(comment => {
    comment.user = {};
    users.forEach(user => {
      if(user._id === comment.idNhanVien)
      comment.user = {...user};
    })
  })
  comments = comments.filter(comment => comment.idBaiViet === postId);
  // console.log(comments);
  renderComments(comments)
}

function renderComments(comments) {
  let data = comments.map(ele => {
    return `
      <div class="d-flex mb-4">
      <div class="flex-shrink-0"><img class="rounded-circle"
          src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
      <div class="ms-3">
        <div class="fw-bold">${ele.user.taiKhoan}</div>
        ${ele.noiDung}
      </div>
      </div>
    `
  }).join('');
  document.querySelector('.card-comments').innerHTML = data;
}

function setCommentData() {
  let data = {
    idNhanVien: user._id,
    idBaiViet: post._id,
    noiDung: commentContent.value,
    ngayTao: ''
  }
  return data;
}

function sendComment() {
  // console.log(setCommentData());
  addComments(setCommentData())
  .then(res => {
    loadData();
  })
}

