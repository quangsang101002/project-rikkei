const getUser = JSON.parse(localStorage.getItem('userAdmin')) ?? [];

function registerAdmin() {
  const username = document.querySelector('#usename').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const repeat_password = document.querySelector('#repeat_password').value;
  const errorMail = document.querySelector('.error-email');
  const errorPassword = document.querySelector('.error-password');
  const errorLength = document.querySelector('.error-length');

  if (!validate()) {
    return;
  }
  const userAdmin = {
    username: username,
    email: email,
    password: password,
  };

  let exitUser = false;
  getUser.forEach((user) => {
    if (user.email == email) {
      exitUser = true;
    }
  });

  if (password.length < 3) {
    errorLength.innerText = 'mật khẩu tối đa 3 kí tự';
    return;
  } else if (password.length > 8) {
    errorLength.innerText = 'mật khẩu tối đa có 8 kí tự trở xuống';
    return;
  }

  if (password == repeat_password) {
    if (!exitUser) {
      getUser.push(userAdmin);
      localStorage.setItem('user', JSON.stringify(getUser));
      window.location = 'login.html';
    } else {
      errorMail.innerText = 'email đã tồn tại';
    }
  } else {
    errorPassword.innerText = 'mật khẩu không trùng khớp';
  }
}

function validate() {
  const errorExit = document.querySelector('.error-exit');
  const email = document.querySelector('#email').value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(email)) {
    return true;
  } else {
    errorExit.innerText = 'Định dạng Email sai';
    return false;
  }
}
