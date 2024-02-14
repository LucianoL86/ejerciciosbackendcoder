import { Router } from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = Router()

router.get('/', isAuthenticated, (req, res) => {
    res.render('signup', {
        title: 'Registrarse',
        style: 'users.css'
    })
})

export default router