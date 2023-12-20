import express from "express"
import { Server } from "socket.io"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import { __dirname } from "./utils.js"
import { ProductManager } from "./classes/ProductManager.js"

const app = express()
const PORT = 8080
const productManager = new ProductManager("products.json")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"))

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/", viewsRouter)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});

const socketServer = new Server(server)

socketServer.on("connection", (socket) => {

  socket.on("addProduct", async (product) => {
    const title = product.title
    const description = product.description
    const category = product.category
    const price = product.price
    const thumbnail = product.thumbnail
    const code = product.code
    const stock = product.stock
    try {
      const result = await productManager.addProduct(
        title,
        description,
        category,
        price,
        thumbnail,
        code,
        stock
      )

      const allProducts = await productManager.getProducts()
      result && socketServer.emit("updateProducts", allProducts)
    } catch (err) {
      console.log(err)
    }
  })

  socket.on("deleteProduct", async (id) => {
    console.log(id)
    try {
      const result = await productManager.deleteProductById(id)
      const allProducts = await productManager.getProducts()
      result && socketServer.emit("updateProducts", allProducts)
    } catch (err) {
      console.log(err)
    }
  })
})
