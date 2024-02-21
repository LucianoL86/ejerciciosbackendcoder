import { Router } from 'express'
import cartModel from '../DAOs/mongodb/models/cart.models.js'
import productsModel from '../DAOs/mongodb/models/products.models.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const carts = await cartModel.find()
        res.json(carts)
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartModel.findById(cid).lean()

        cart.products.forEach((product) => {
            product.subtotal = parseFloat(product.quantity * product.product.price).toFixed(2)
        })

        res.render('cart', {
            cart: cart._id.toString(),
            products: cart.products,
            style: 'cart.css'
        })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.get('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const product = await productsModel.findById(pid)
        const cart = await cartModel.findById(cid)
        
        res.json({ product, cart })
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

    
router.post('/', async (req, res) => {
    try{
        const response = await cartModel.create(req.body)
        res.json(response)
    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params
        const product = await productsModel.findById(pid)
        const cart = await cartModel.findById(cid)
        let hasChanged = false

        const newProduct = {
            product,
            quantity: 1
        }

        if (!product || !cart) {
            res.status(400).json({ status: 'error', error: 'Cart or product not found' });
        }

        const productIndex = cart.products.findIndex((p) => p.product.equals(pid))

        if (productIndex === -1) {
            cart.products.push(newProduct)
            hasChanged = true
        } else {
            cart.products[productIndex].quantity += 1
            hasChanged = true
        }

        if (hasChanged) {
            const response = await cartModel.findByIdAndUpdate(cid, {
                products: cart.products
            })
            res.json({ status: 'success', message: response })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.delete('/:cid/product/:pid', async (req, res) => {
    try{
        const { cid, pid } = req.params
        const product = await productsModel.findById(pid)
        const cart = await cartModel.findById(cid)
        let hasChanged = false

        if (!product || !cart) {
            res.status(400).json({ status: 'error', error: 'Cart or product not found' });
        }

        const productIndex = cart.products.findIndex((p) => p.product.equals(pid))

        if (productIndex === -1) {
            res.status(400).json({ status: 'error', error: 'Product not found in cart' });
        }else {
            cart.products[productIndex].quantity -= 1
            if (cart.products[productIndex].quantity === 0) {
                cart.products.splice(productIndex, 1)
            }
            hasChanged = true
        }

        if (hasChanged) {
            const response = await cartModel.findByIdAndUpdate(cid, {
                products: cart.products
            })
            res.json({ status: 'success', message:  response })
        }

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const response = await cartModel.deleteOne({ _id: cid })
        res.json({ status: 'success', message: response })

    } catch (error) {
        res.status(500).json({ status: 'error', error: 'Internal error' });
    }
})





export default router


