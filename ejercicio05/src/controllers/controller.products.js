import { Router } from 'express'
import { productsModel } from '../DAOs/mongodb/models/products.models.js'


const router = Router()

router.get('/', async (req, res) => {
    const products = await productsModel.find()
    res.json({ message: products })
})


router.post('/', async (req, res) => {
    const { title, description, category, price, thumbnail, code, stock } = req.body

    const newProductInfo = {
        title,
        description,
        category,
        price,
        thumbnail,
        code,
        stock
    }

    const newProduct = await productsModel.create(newProductInfo)
    res.json({ message: 'Product created', newProduct })
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, description, category, price, thumbnail, code, stock } = req.body
    const newProductInfo = {
        title,
        description,
        category,
        price,
        thumbnail,
        code,
        stock
    }
    await productsModel.findByIdAndUpdate(id, newProductInfo)
    res.json({ message: 'Product updated' })
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await productsModel.findByIdAndDelete(id)
    res.json({ message: 'Product deleted' })
})

export default router