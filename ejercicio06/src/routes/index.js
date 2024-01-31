import productsController from '../controllers/products.controller.js'
import chatController from '../controllers/chat.controller.js'
import cartController from '../controllers/cart.controller.js'
import loginController from '../controllers/login.controller.js'
import sessionController from '../controllers/session.controller.js'
import signupController from '../controllers/signup.controller.js'

const router = app => {
    app.use('/products', productsController)
    app.use('/chat', chatController)
    app.use('/cart', cartController)
    app.use('/login', loginController)
    app.use('/', sessionController)
    app.use('/signup', signupController)
}


export default router