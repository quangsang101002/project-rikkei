function modal() {
  // handelAdmin();
  const modal = document.getElementById('myModal');
  const btn = document.getElementById('myBtn');
  const span = document.getElementsByClassName('close')[0];
  btn.onclick = function () {
    modal.style.display = 'block';
  };
  span.onclick = function () {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}
modal();
const getProduct = JSON.parse(localStorage.getItem('product')) ?? [];

handelDelete();
//đẩy sản phẩm lên localsatorage
function handelAdmin() {
  const name = document.querySelector('.name').value;
  const price = document.querySelector('.price').value;
  const image = document.querySelector('.image').value;
  const description = document.querySelector('.description').value;

  const modal = document.getElementById('myModal');

  const product = {
    id: getProduct.length + 1,

    name: name,
    price: price,
    image: image,
    description: description,
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
  if (
    name.trim() !== '' &&
    price.trim() !== '' &&
    image.trim() !== '' &&
    description.trim() !== ''
  ) {
    getProduct.push(product);
    localStorage.setItem('product', JSON.stringify(getProduct));
    handelUpdate(getProduct);
    modal.style.display = 'none';
  } else {
    alert('Bạn chưa nhập thông tin! OK');
  }
}
document.onkeydown = function (e) {
  const modal = document.getElementById('myModal');
  if (e.key === 'Enter' && modal.style.display === 'block') {
    handelAdmin();
  }
};
// thêm sản phẩm
function handelUpdate(getProduct) {
  const table = document.querySelector('tbody');

  let tableList = '';
  getProduct.forEach((product, index) => {
    tableList += `
    <tr >
    <td>${index + 1}</td>
    <td >${product.name}</td>
    <td>${product.price}</td>
    <td>${product.image}</td>
    <td>${product.description}</td>
    <td><button class="btn_edit" onclick="handelEdit(${
      product.id
    })" >Edit</button>
    <button class="btn_delete" onclick="handelDelete(${
      product.id
    })">Delete</button></td>
    </tr>
    `;
  });
  // filter();
  table.innerHTML = tableList;
}
// xóa sản phẩm
function handelDelete(id) {
  const getProduct = JSON.parse(localStorage.getItem('product'));
  getProduct.forEach((product) => {
    if (product.id === id) {
      if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
        getProduct.forEach((product, index) => {
          if (product.id === id) {
            getProduct.splice(index, 1);
          }
        });
      }
    }
  });

  localStorage.setItem('product', JSON.stringify(getProduct));
  handelUpdate(getProduct);
}

// sửa sản phẩm
function handelEdit(id) {
  const displayModal = document.querySelector('.modal-edit');
  const closeedit = document.querySelector('.close-edit');
  const nameEditInput = document.querySelector('.name-edit');
  const priceEditInput = document.querySelector('.price-edit');
  const descriptionEditInput = document.querySelector('.description-edit');
  const saveButton = document.querySelector('.save-button');
  const imageEdit = document.querySelector('.image-edit');
  const getProductss = JSON.parse(localStorage.getItem('product'));

  displayModal.style.display = 'block';
  closeedit.addEventListener('click', function () {
    displayModal.style.display = 'none';
  });

  getProductss.forEach((product) => {
    if (product.id === id) {
      nameEditInput.value = product.name;
      priceEditInput.value = product.price;
      descriptionEditInput.value = product.description;
      imageEdit.value = product.image;
    }
  });

  saveButton.addEventListener('click', function () {
    handelSave(id);
    displayModal.style.display = 'none';
  });

  window.onclick = function (event) {
    if (event.target == displayModal) {
      displayModal.style.display = 'none';
    }
  };
}
//lưu sản phẩm khi sửa xong
function handelSave(id) {
  const getProductss = JSON.parse(localStorage.getItem('product'));
  const nameEditInput = document.querySelector('.name-edit');
  const priceEditInput = document.querySelector('.price-edit');
  const descriptionEditInput = document.querySelector('.description-edit');
  const imageEdit = document.querySelector('.image-edit');

  getProductss.forEach((product) => {
    if (product.id === id) {
      product.name = nameEditInput.value;
      product.price = priceEditInput.value;
      product.description = descriptionEditInput.value;
      product.image = imageEdit.value;
    }
  });

  localStorage.setItem('product', JSON.stringify(getProductss));
  handelUpdate(getProductss);
}

function filter() {
  const mySearch = document.querySelector('#mySearch');
  const filter = mySearch.value.toUpperCase();
  const tr = document.querySelectorAll('tr');

  for (let i = 1; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName('td')[1];

    if (td) {
      const textValue = td.textContent || td.innerHTML || td.innerText;

      if (textValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = '';
      } else {
        tr[i].style.display = 'none';
      }
    }
  }
}
