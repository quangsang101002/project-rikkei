function handeLogin() {
  const username = document.querySelector('#usename').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('.password_login').value;
  const passworkError = document.querySelector('.login-error');
  const emaiLogon = document.querySelector('.emaiLogon');

  const login = {
    username: username,
    email: email,
    password: password,
  };

  event.preventDefault();
  const getLogin = JSON.parse(localStorage.getItem('user'));

  getLogin.forEach((user) => {
    if (user.email == email) {
      if (user.password == password) {
        window.location = 'home.html';
      } else {
        passworkError.innerText = 'Nhập mật khẩu sai';
        return;
      }
    } else {
      emaiLogon.innerText = 'Nhập Email sai';
      return;
    }
  });

  localStorage.setItem('userLogin', JSON.stringify(login));
}
