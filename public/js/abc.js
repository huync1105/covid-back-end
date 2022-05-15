const searchResult = document.querySelector(".search-result");
const searchInput = document.querySelector("#search-post");
let posts = [];

window.addEventListener("DOMContentLoaded", () => {
  LoadData();
});

function LoadData() {
  getPostsData().then((res) => {
    posts = res;
    console.log(posts);
  });
}

// get posts
async function getPostsData() {
  let postAPI = window.location.origin + "/posts";
  let request = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(),
  };
  const response = await fetch(postAPI, request);
  return response.json();
}

searchInput.addEventListener("keyup", () => {
  let closeBtn = `
      <div class="search-close" style="position: absolute; top: 20px; right: 20px">
        <button class="btn" onclick="closeSearch()">
            <i class="fas fa-times-circle"></i>
        </button>
      </div>
    `;
  if (searchInput.value.trim().toString()) {
    let postFilter = posts.filter((post) =>
      post.tieuDe.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    if (postFilter.length) {
      let data = postFilter
        .map((post) => {
          return `
          <div class="container p-2 d-flex search-container" onclick="seeDetail('${post._id}')">
            <img class="img-thumbnail me-3" src="${post.anhBia}">
            <div class="search-content">
                <h4 class="m-0 t-overflow">${post.tieuDe}</h3>
                <p class="m-0 t-overflow"><i>${post.moTa}</i></p>
                <p class="m-0">${post.ngayTao}</p>
            </div>
          </div>
          `;
        })
        .join("");
      searchResult.innerHTML = data + closeBtn;
    } else {
      searchResult.innerHTML =
        `
        <div class="container p-2 d-flex search-container justify-content-center">
          <img class="img-fluid" style="max-width:50%" src="https://cdn.dribbble.com/users/1094048/screenshots/3393640/media/25b931a815bc90e9f5717f892c53834a.png">
        </div>
      ` + closeBtn;
    }
  } else {
    searchResult.innerHTML =
      `
        <div class="container p-2 d-flex search-container justify-content-center">
          <img class="img-fluid" style="max-width:50%" src="https://cdn.dribbble.com/users/1094048/screenshots/3393640/media/25b931a815bc90e9f5717f892c53834a.png">
        </div>
      ` + closeBtnd;
  }
  searchResult.style.display = "block";
});

function seeDetail(id) {
    console.log(id);
    localStorage.setItem('postId', id);
    location.pathname = 'Chi-tiet-bai-viet/post-detail.html'
  }

function closeSearch() {
    searchResult.style.display = 'none';
  }
  