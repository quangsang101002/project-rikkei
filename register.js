function register() {
  const username = document.querySelector('#usename').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const repeat_password = document.querySelector('#repeat_password').value;

  event.preventDefault();

  if (!validate()) {
    return;
  }

  // xác thực mật khẩu
  if (password !== repeat_password) {
    alert('mật khẩu không trùng lặp');
    return;
  }
  const users = {
    username: username,
    email: email,
    password: password,
  };

  const getUser = JSON.parse(localStorage.getItem('user')) ?? [];

  let exitUser = false;
  getUser.forEach((user) => {
    if (user.email === email) {
      exitUser = true;
    }
  });

  // xác thực email đã tồn tại chưa
  if (!exitUser) {
    getUser.push(users);
    localStorage.setItem('user', JSON.stringify(getUser));
    window.location = 'login.html';
  } else {
    alert('email đã được đăng kí');
  }
}

function validate() {
  const email = document.querySelector('#email').value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(email)) {
    return true;
  } else {
    alert('đây không phải email');
    return false;
  }
}
