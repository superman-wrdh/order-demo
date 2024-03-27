// cart.js
function addCart(productId) {
  let postData = {
    productId: productId,
  };
  axios
    .post('/shopping-cart', postData, {
      headers: {
        // 可以根据需要添加任何特定的请求头
        'Content-Type': 'application/json',
      },
    })
    .then(function (response) {
      // 请求成功后执行的操作
      console.log('Response:', response);
    })
    .catch(function (error) {
      // 请求失败后执行的操作
      console.log('Error:', error);
    });
}

function showCart() {
  axios
    .get('http://127.0.0.1:3000/shopping-cart')
    .then((response) => {
      displayCartItems(response.data);
    })
    .catch((error) => console.error('Error:', error));

  // 展示购物车项目
  function displayCartItems(items) {
    const cartElement = document.getElementById('shopping-cart');
    cartElement.innerHTML = ''; // 清空购物车项目

    items.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');

      itemElement.innerHTML = `
      <input type="checkbox" class="cart-item-checkbox" data-price="${item.price}" data-quantity="${item.quantity}" data-product-id="${item.id}">
      <img src="${item.img_url}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>价格: ￥${formatPrice(item.price)}</p>
        <p>数量: ${item.quantity}</p>
      </div>
      <button onclick="removeItem('${item.id}')">删除</button>
    `;
      cartElement.appendChild(itemElement);
      // 在displayCartItems函数内，创建复选框后：
      const checkbox = itemElement.querySelector('.cart-item-checkbox');
      checkbox.addEventListener('change', updateTotalPrice);
    });
  }
}

// 使用axios封装的删除购物车项目的函数
function deleteCartItem(itemId) {
  axios
    .delete(`/shopping-cart/${itemId}`)
    .then((response) => {
      console.log('项目删除成功', response.data);
      alert('删除成功');
      // 删除成功后的操作，比如重新加载购物车项目
      showCart(); // 假设这个函数用来加载和显示购物车项目
    })
    .catch((error) => console.error('删除项目时发生错误', error));
}

// 删除购物车项目
function removeItem(itemId) {
  deleteCartItem(itemId);
}

function updateTotalPrice() {
  const checkboxes = document.querySelectorAll('.cart-item-checkbox:checked');
  let totalPrice = 0;

  checkboxes.forEach((checkbox) => {
    const price = parseInt(checkbox.dataset.price, 10);
    const quantity = parseInt(checkbox.dataset.quantity, 10);
    totalPrice += price * quantity;
  });

  document.getElementById('total-price').textContent =
    `总价格：￥${formatPrice(totalPrice)}`;
}

document.getElementById('checkout-button')
  .addEventListener('click', function () {
    // 初始化一个空数组来存储选中的产品信息
    const selectedProducts = [];

    // 获取所有选中的复选框元素
    const checkedCheckboxes = document.querySelectorAll(
      '.cart-item-checkbox:checked',
    );

    // 遍历选中的复选框，收集产品ID和数量
    checkedCheckboxes.forEach((checkbox) => {
      const productId = checkbox.dataset.productId; // 确保你在复选框元素上设置了data-product-id属性
      const quantity = checkbox.dataset.quantity; // 之前已经有这个属性了
      selectedProducts.push({ productId, quantity: parseInt(quantity, 10) });
    });

    // 打印选中的产品ID和数量
    console.log('Selected Products:', selectedProducts);

    // TODO 可以在这里添加进一步的逻辑，比如发送这些信息到服务器进行下一步处理
    // 将循环selectedProducts 拼接id和数量乘字符串
    const productsString = selectedProducts.map(product => `产品id:${product.productId} 数量  ${product.quantity} \n`).join(" ");
    alert(productsString);

  });

showCart();
