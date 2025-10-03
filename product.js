const id = Number(localStorage.getItem('productID'));
fetch('catalog.json')
  .then(res => res.json())
  .then(items => {
    const item = items.find(i => i.id === id);
    if(!item) return;
    document.getElementById('product-details').innerHTML = `
      <div class="item">
        <img src="${item.img}" alt="${item.title}">
        <div class="item-title">${item.title}</div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-price">${item.price} ₽</div>
        <button class="add-cart" onclick="addCart(${item.id})">В корзину</button>
        <a href="index.html">← Вернуться в каталог</a>
      </div>
    `;
  });

function addCart(id) {
  fetch('catalog.json')
    .then(res => res.json())
    .then(items => {
      const item = items.find(i => i.id === id);
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Товар добавлен в корзину!');
    });
}
