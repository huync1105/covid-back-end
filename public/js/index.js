const postContainer = document.querySelector('.post-container');
const heroSlider = document.querySelector('.carousel-inner');
const searchResult = document.querySelector('.search-result');
const searchInput = document.querySelector('#search-post');
const categoryDropDown = document.querySelector('.dropdown-menu');
let posts = [];
let subCategories = [];
let newPosts = [];

window.addEventListener('DOMContentLoaded', () => {
  LoadData();
})

function LoadData() {
  getPostsData()
    .then(res => {
      posts = res;
      // console.log(posts);
      renderSlides(posts);
    })
  getCategoryList()
    .then(res => {
      subCategories = res;
      // console.log("subCategories", subCategories);
      renderDropDown(subCategories);
      renderPosts(6)
    })
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

function renderPosts(i) {
  let data = subCategories.map((ele, index, array) => {
    if (ele.posts.length) {
      return `
        <section id="${ele._id}">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="intro">
                  <h1>${ele.ten}</h1>
                </div>
              </div>
            </div>
            <div class="row">
              ${ele.posts.map((post, index, array) => {
                if (post.daDuyet && index < i)
                  return `
                        <div class="col-md-4 col-sm-6 mb-4">
                          <article class="blog-post">
                            <div class="post-img">
                              <img src="${post.anhBia}" height="100%" alt="${post.anhBia}">
                            </div>
                            <a class="tag" onclick="seeDetail('${post._id}')">T??m hi???u</a>
                            <div class="content" style="min-height: 280px">
                                <small>${post.ngayTao}</small>
                                <h5>${post.tieuDe}</h5>
                                <p>${post.moTa}</p>
                            </div>
                          </article>
                        </div>
                        `
              }).join('')}
              ${ele.posts.length > 5?`
              <div class="col-12 d-flex justify-content-center">
                ${i===6?`
                <button type="button" class="btn btn-primary" onclick="renderPosts(${ele.posts.length})">Xem th??m</button>
                `:`
                <button type="button" class="btn btn-primary" onclick="renderPosts(6)">Thu g???n</button>
                `}
              </div>
              `:``}
            </div>
          </div>
        </section>
      `
    }
  }).join('');
  postContainer.innerHTML = data;
}

function renderSlides(posts) {
  let data = posts.map((post, index) => {
    if(post.daDuyet) {
      if (index === 0) {
        return `
        <div class="carousel-item active" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('${post.anhBia}');background-size:cover; background-repeat: no-repeat;width: 100%; height:90vh; overflow: hidden;">
          <div class="caroulse-content d-flex justify-content-center align-items-center flex-column" style="width: 100%; height: 100%;">
            <h1 style="color: white; width: 30%; text-align: center" class="mb-4">${post.tieuDe}</h1>
            <button class="btn btn-primary" type="button" onclick="seeDetail('${post._id}')">T??m hi???u</button>
          </div>
        </div>
        `
      } else {
        return `
        <div class="carousel-item" style="background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('${post.anhBia}');
        background-repeat: no-repeat; background-size:cover; width: 100%; height:90vh; overflow: hidden;">
          <div class="caroulse-content d-flex justify-content-center align-items-center flex-column" style="width: 100%; height: 100%;">
            <h1 style="color: white; width: 30%; text-align: center" class="mb-4">${post.tieuDe}</h1>
            <button class="btn btn-primary" type="button" onclick="seeDetail('${post._id}')">T??m hi???u</button>
          </div>
        </div>
        `
      }
    }
  }).join('');
  heroSlider.innerHTML = data;
}

function renderDropDown(list) {
  let data = list.map(item => {
    if (item.posts.length) {
      return `
        <li><a class="dropdown-item" href="#${item._id}">${item.ten}</a></li>
      `
    }
  }).join('')
  categoryDropDown.innerHTML = data;
}

searchInput.addEventListener('keyup', () => {
  let closeBtn = `
    <div class="search-close" style="position: absolute; top: 20px; right: 20px">
      <button class="btn" onclick="closeSearch()">
          <i class="fas fa-times-circle"></i>
      </button>
    </div>
  `
  if (searchInput.value.trim().toString()) {
    let postFilter = posts.filter(post => post.tieuDe.toLowerCase().includes(searchInput.value.toLowerCase()));
    if (postFilter.length) {
      let data = postFilter.map(post => {
        return `
        <div class="container p-2 d-flex search-container" onclick="seeDetail('${post._id}')">
          <img class="img-thumbnail me-3" src="${post.anhBia}">
          <div class="search-content">
              <h4 class="m-0 t-overflow">${post.tieuDe}</h3>
              <p class="m-0 t-overflow"><i>${post.moTa}</i></p>
              <p class="m-0">${post.ngayTao}</p>
          </div>
        </div>
        `
      }).join('')
      searchResult.innerHTML = data + closeBtn;
    } else {
      searchResult.innerHTML = `
      <div class="container p-2 d-flex search-container justify-content-center">
        <img class="img-fluid" style="max-width:50%" src="https://cdn.dribbble.com/users/1094048/screenshots/3393640/media/25b931a815bc90e9f5717f892c53834a.png">
      </div>
    ` + closeBtn
    }
  } else {
    searchResult.innerHTML = `
      <div class="container p-2 d-flex search-container justify-content-center">
        <img class="img-fluid" style="max-width:50%" src="https://cdn.dribbble.com/users/1094048/screenshots/3393640/media/25b931a815bc90e9f5717f892c53834a.png">
      </div>
    ` + closeBtnd
  }
  searchResult.style.display = 'block';
})

function seeDetail(id) {
  console.log(id);
  localStorage.setItem('postId', id);
  location.pathname = 'Chi-tiet-bai-viet/post-detail.html'
}

function closeSearch() {
  searchResult.style.display = 'none';
}

// ================================================================
// send email
// ================================================================
const userName = document.getElementById('userName');
const userFirstName = document.getElementById('userFirstName');
const userEmail = document.getElementById('userEmail');
const userQuestion = document.getElementById('userQuestion');

document.querySelector('.send-email-btn').addEventListener('click', () => {
  sendEmail()
  alert('Email sent successfully!');
})

function sendEmail() {
  let data = {
    ten: userName.value,
    ho: userFirstName.value,
    email: userEmail.value,
    cauHoi: userQuestion.value
  }
  let API = window.location.origin  +  '/sendemail';
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
  fetch(API, request);
}

