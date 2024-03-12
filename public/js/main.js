function formatPrice(priceInCents) {
  return (priceInCents / 100).toFixed(2);
}

function addToCart(product) {
  console.log('添加产品到购物车：', product);
  let cart = localStorage.getItem('shopping-cart');
  cart = cart ? JSON.parse(cart) : { product_list: [] };

  // 检查产品是否已在购物车中
  const existingProduct = cart.product_list.find(p => p._id === product._id);
  if (!existingProduct) {
    cart.product_list.push(product);
  }

  localStorage.setItem('shopping-cart', JSON.stringify(cart));
  alert(`${product.name} 已添加到购物车`);
}

// 修改fetchProducts函数，允许接受搜索关键字
function fetchProducts(searchKeyword = '') {
  let url = '/products';
  if (searchKeyword) {
    url += `?name=${encodeURIComponent(searchKeyword)}`; // 将搜索关键字作为查询参数
  }

  axios.get(url)
    .then(function (response) {
      const products = response.data;
      const container = document.getElementById('productContainer');
      // 清空当前产品列表
      container.innerHTML = '';
      products.forEach((product) => {
        // 创建包裹产品信息的<a>标签
        const productLink = document.createElement('a');
        productLink.href = `/views/detail.html?id=${product._id}`; // 设置链接URL
        productLink.className = 'product-link'; // 为链接添加类名，便于CSS样式化
        productLink.innerHTML = `
                    <div class="product">
                        <img src="${product.img_url}" alt="${product.name}">
                        <div class="price">￥${formatPrice(product.price)}</div>
                        <div class="name">${product.name}</div>
                        <button class="add-to-cart"> + </button>
                    </div>
                `;
        container.appendChild(productLink);

        // 为“加入购物车”按钮添加事件监听器
        productLink
          .querySelector('.add-to-cart')
          .addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡 为啥起作用？
            addToCart(product);
          });
      });
    })
    .catch(function (error) {
      console.error('获取产品数据失败：', error);
    });
}

// 添加搜索功能
function setupSearch() {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');

  searchButton.addEventListener('click', function () {
    const searchKeyword = searchInput.value.trim();
    fetchProducts(searchKeyword);
  });
}

// 如果需要使用JavaScript进行页面跳转，可以添加此脚本
document.getElementById('cartButton').onclick = function () {
  window.location.href = '/views/shopping-cart.html';
};

// 页面加载完毕后，获取产品列表
window.onload = function () {
  fetchProducts(); // 首次加载不带搜索关键字
  setupSearch(); // 设置搜索按钮的事件监听器
};
