const userEmail = document.querySelector('#user-email');
const userPassword = document.querySelector('#password');
const userRePassword = document.querySelector('#re-password');
const changePassWord = document.querySelector('.login-btn');
let users = [];

window.addEventListener('DOMContentLoaded', () => {

})

async function getUsers() {
  let API = window.location.origin  +  '/users';
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

async function updateUser(data, id) {
  let API = window.location.origin  +  `/users/${id}`;
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

changePassWord.addEventListener('click', () => {
  let loading = document.querySelector('.loading');
  loading.style.display = 'block';
  getUsers()
  .then(res => {
    users = res;
    // console.log("users", users);
    if (checkEmail(users) && checkPassWord(userPassword.value, userRePassword.value)) {
      let user = users.find(user => user.email === userEmail.value);
      console.log(user);
      if (userRePassword.value) {
        updateUser(setData(user), user._id)
        .then(res => {
          loading.style.display = 'none';
          alert('Thay đổi mật khẩu thành công');
          location.pathname = '/admin'
        })
      } else {
        alert('Vui lòng nhập lại mật khẩu');
        loading.style.display = 'none';

      }
    } else {
      loading.style.display = 'none';
    }
  })
})

function checkEmail(users) {
  let emailList = users.map(user => user.email);
  if (!emailList.includes(userEmail.value)) {
    alert('Email không đúng!');
    return false
  } else {
    return true;
  }
}

function checkPassWord(password, repassword) {
  if (password !== repassword) {
    alert('Mật khẩu không trùng khớp!');
    return false;
  } else {
    return true;
  }
}

function setData(user) {
  let data = {
    ...user,
    matKhau: userPassword.value,
  }
  delete data.posts;
  delete data._id;
  return data;
}