// Загрузка первоначального экрана бренда и анимации
setTimeout(() => {
  document.getElementById('loader').style.display = 'none';
  document.getElementById('main').style.display = 'block';
  loadCatalog('all');
}, 5000);

// Каталог — загрузка и фильтрация
let catalogItems = [];
fetch('catalog.json')
  .then(res => res.json())
  .then(items => {
    catalogItems = items;
    loadCatalog('all');
  });

function loadCatalog(category) {
  const catalog = document.getElementById('catalog');
  catalog.innerHTML = '';
  const filtered = category === 'all' ? catalogItems : catalogItems.filter(item => item.category === category);
  filtered.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" onclick="openProduct(${item.id})">
      <div class="item-title">${item.title}</div>
      <div class="item-desc">${item.desc}</div>
      <div class="item-price">${item.price} ₽</div>
      <button class="add-cart" onclick="addCart(${item.id})">В корзину</button>
    `;
    catalog.appendChild(div);
  });
}

document.querySelectorAll('.categories button').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.categories button').forEach(b => b.classList.remove('cat-active'));
    btn.classList.add('cat-active');
    loadCatalog(btn.getAttribute('data-category'));
  }
});

// Корзина (базово, localStorage)
let cart = [];
function addCart(id) {
  const item = catalogItems.find(i => i.id === id);
  cart.push(item);
  document.getElementById('cart-count').textContent = cart.length;
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Товар добавлен в корзину!');
}

// Открытие детальной страницы (пример через передачу ID)
function openProduct(id) {
  localStorage.setItem('productID', id);
  window.location.href = "product.html";
}
