const socket = io()

const addProductBtn = document.getElementById("addProductBtn")
const deleteProductBtn = document.getElementById("deleteProductBtn")

addProductBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const category = document.getElementById("category").value
  const price = document.getElementById("price").value
  const thumbnail = document.getElementById("thumbnail").value
  const code = document.getElementById("code").value
  const stock = document.getElementById("stock").value

  const product = {
    title,
    description,
    category,
    price,
    thumbnail,
    code,
    stock,
  };

  socket.emit("addProduct", product)
  title.value = ""
  description.value = ""
  category.value = ""
  price.value = ""
  thumbnail.value = ""
  code.value = ""
  stock.value = ""
});

deleteProductBtn.addEventListener("click", () => {
  const id = document.getElementById("productId").value
  socket.emit("deleteProduct", id)
  id.value = ""
  alert("producto eliminado")
})

socket.on("updateProducts", (products) => {
  const productListContainer = document.querySelector('.productList')

  productListContainer.innerHTML = ''

  products.forEach((product) => {
    const productCard = document.createElement('div')
    productCard.classList.add('productCard')

    productCard.innerHTML = `
      <div class="cardProduct-image">
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>
      <div class="cardProduct-info">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>Precio: $${product.price}</p>
        <p>Stock: ${product.stock}</p>
        <p>Stock: ${product.code}</p>
        <p>Stock: ${product.id}</p>
      </div>
    `
    productListContainer.appendChild(productCard)
  })
});
