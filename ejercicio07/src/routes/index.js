import productsController from '../controllers/products.controller.js'
import chatController from '../controllers/chat.controller.js'
import cartController from '../controllers/cart.controller.js'
import sessionController from '../controllers/session.controller.js'
import viewsController from '../controllers/views.controller.js'

const router = app => {
    app.use('/api/session', sessionController)
    app.use('/products', productsController)
    app.use('/cart', cartController)
    app.use('/chat', chatController)
    app.use('/', viewsController)
}

export default router