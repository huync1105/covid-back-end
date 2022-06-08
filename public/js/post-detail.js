const accordion = document.querySelector('.accordion');
const postContent = document.querySelector('.post-content');
const searchResult = document.querySelector('.search-result');
const searchInput = document.querySelector('#search-post');
const commentInput = document.querySelector('#comment-input');
const commentBtn = document.querySelector('#comment-btn');
let posts = [];
let subCategories = [];
let post = {};
let cuscoms = [];

window.addEventListener('DOMContentLoaded', () => {
  loadData();
})

function loadData() {
  getPostsData()
    .then(res => {
      posts = res;
      // console.log(posts);
    })
  getCategoryList()
    .then(res => {
      subCategories = res;
      // joinPosts();
      renderAccordion(subCategories);
      getPostData(localStorage.postId)
        .then(res => {
          post = res;
          // console.log("post", post);
          renderPostContent(post);
          getCuscoms()
            .then(res => {
              // console.log("res", res);
              cuscoms = res;
              renderCommments(cuscoms);
            })
        })
    })
}

// get posts
async function getPostsData() {
  let postAPI = window.location.origin + '/posts';
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
  let API = window.location.origin + '/subcategories';
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
function renderAccordion(subCategories) {
  let data = subCategories.map((ele, index) => {
    if (ele.posts.length) {
      return `
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapseOne">
              ${ele.ten}
              <span class="fa fa-chevron-down"></span>
            </button>
          </h2>
          <div id="collapse${index}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="list-group">
                ${ele.posts.map(post => {
        if (post.daDuyet) {
          return `
                      <a href="" class="list-group-item list-group-item-action" onclick="changePage('${post._id}')">${post.tieuDe}</a>
                    `
        }
      }).join('')}
              </div>
            </div>
          </div>
        </div>
      `
    }
  }).join('');
  accordion.innerHTML = data;
}

function changePage(id) {
  localStorage.setItem('postId', id);
  loadData();
}

// get post by id
async function getPostData(id) {
  // let currentPostId = localStorage.postId;
  // console.log(currentPostId);
  let userAPI = window.location.origin + `/posts/${id}`;
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

function renderPostContent(post) {
  // console.log(post);
  let category = subCategories.find(obj => obj._id === post.idDanhMuc).ten;
  // console.log(category);
  let data = `
  <h3 class="mb-4">${category}</h3>
  <img src="${post.anhBia}" class="img-fluid" alt="${post.anhBia}">
  <div class="mt-3">
    <button type="button" onclick="textToSpeech('play')" class="btn btn-primary play-btn me-2">Phát</button>
    <button type="button" onclick="textToSpeech('stop')" class="btn btn-danger">Dừng</button>
  </div>
  <p></p>
    <h3>${post.tieuDe}</h3>
    ${post.noiDungHTML}
  `
  postContent.innerHTML = data;
}


let synth = window.speechSynthesis;
let toSpeak = new SpeechSynthesisUtterance(post.noiDungText);
toSpeak.lang = 'vi-VI';

// button text to speech
function playSpeech() {
  toSpeak.rate = 2
  synth.speak(toSpeak);
  console.log(synth);
}

function pauseSpeech() {
  synth.pause();
  console.log(synth);
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

// convert text to speech
function textToSpeech(request) {
  var u = new SpeechSynthesisUtterance;
  u.text = post.noiDungText;
  u.lang = 'vi-VN';
  console.log("u", u);
  if (request === 'play') {
    speechSynthesis.speak(u)
  } else {
    speechSynthesis.cancel(u)
  }
}

// render comments
async function getCuscoms() {
  let API = window.location.origin + '/cuscom';
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

// add comments
async function addComments(data) {
  let postAPI = window.location.origin + `/cuscom`;
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
  const response = await fetch(postAPI, request);
  return response.json();
}

function renderCommments() {
  let data = cuscoms.map(com => {
    return `
      <div class="comment d-flex" style="width: 100%">
      ${com.idBaiViet === post._id ? `
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFMA-Ix5gnZzUHhjfBh2wKj1z3m0lLoJU4oqaA9IcAAcCZPrszSgnb4ANcQAOdnBv9Svk&usqp=CAU" style="width:40px;height: 40px; border-radius: 100%; padding: 0" alt="...">
        <div class="comment-content ms-4" style="max-width: 90%">
          <p class="m-0"><b>Ẩn danh</b> -  <span style="color: #ccc">${com.ngayTao}</span></p>
          <p>${com.noiDung}</p>
        </div>
          `: ``}
      </div>
    `
  }).join('');
  document.querySelector('.comments-container').innerHTML = data;
}

function addZero(i) {
  if (i < 10) { i = "0" + i }
  return i;
}

commentBtn.addEventListener('click', () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let s = addZero(d.getSeconds());
  let time = h + ":" + m + ":" + s;
  let data = {
    idBaiViet: post._id,
    noiDung: commentInput.value,
    ngayTao: `${day}/${month}/${year} lúc ${time}`,
  }
  let darkWords = ['đù má', 'vãi'];
  if (darkWords.some(v => data.noiDung.includes(v))) {
    alert('Nói tục là không văn minh')
  } else {
    // console.log(data);
    addComments(data);
    loadData()
  }
})