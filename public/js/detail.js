// 解析URL参数以获取产品ID
function getProductIdFromUrl() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get('id');
}

// 根据产品ID请求产品详细信息
function fetchProductDetail(productId) {
  axios.get(`/products/${productId}`)
    .then(function (response) {
      const product = response.data;
      displayProductDetail(product);
    })
    .catch(function(error) {
      console.error('获取产品详情失败：', error);
    });
}

// 展示产品详细信息
function displayProductDetail(product) {
  const container = document.getElementById('productDetail');
  container.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.img_url}" alt="${product.name}" style="max-width: 100%; height: auto;">
        <p>价格：￥${(product.price / 100).toFixed(2)}</p>
        <p>类别：${product.category}</p>
    `;
  // 创建添加到购物车的按钮
  const addToCartBtn = document.createElement('button');
  addToCartBtn.id = 'addToCartBtn';
  addToCartBtn.className = 'add-to-cart';
  addToCartBtn.textContent = '添加到购物车';
  container.appendChild(addToCartBtn);

  // 添加事件监听器
  addToCartBtn.addEventListener('click', function () {
    const productId = getProductIdFromUrl();
    console.log('添加到购物车的产品 ID:', productId);
    addCart(productId);
    alert('添加成功');
  });
}

// 显示错误信息
function displayError(message) {
  const container = document.getElementById('productDetail');
  container.innerHTML = `<p style="color: red; font-size: 24px; text-align: center;">${message}</p>`;
}

document.getElementById('viewCartBtn').addEventListener('click', function() {
  window.location.href = '/views/shopping-cart.html'; // 修改为正确的路径
});

// 页面加载完成后，获取URL参数并请求产品详情
window.onload = function () {
  const productId = getProductIdFromUrl();
  if (productId) {
    fetchProductDetail(productId);
  } else {
    displayError('产品ID未提供或无效');
    console.error('产品ID未提供或无效');
  }
};

