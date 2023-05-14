function handeLogin() {
  const username = document.querySelector('#usename').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const login = {
    username: username,
    email: email,
    password: password,
  };

  event.preventDefault();
  const getLogin = JSON.parse(localStorage.getItem('user'));

  getLogin.forEach((user) => {
    if (
      user.email === email &&
      user.password === password &&
      user.username === username
    ) {
      window.location = 'home.html';
    } else {
      //   alert('tên đăng nhập sai');
      return;
    }
  });

  localStorage.setItem('userLogin', JSON.stringify(login));
}
