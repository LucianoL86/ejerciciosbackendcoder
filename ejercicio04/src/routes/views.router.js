import { Router } from "express"
import { ProductManager } from "../classes/ProductManager.js"

const router = Router()
const productManager = new ProductManager("products.json")

router.get("/products", async (req, res) => {
  const products = await productManager.getProducts()
  res.render("products", {
    title: "Listado de productos",
    products,
    style: "css/styles.css",
  })
})

router.get("/realtime", async (req, res) => {
  const products = await productManager.getProducts()
  res.render("realtime", {
    title: "Productos en tiempo real",
    products: products,
    style: "css/styles.css",
  })
})

export default router
