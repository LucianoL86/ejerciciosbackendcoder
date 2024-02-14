import { Router } from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = Router()

router.get('/', isAuthenticated, (req, res) => {
    res.render('login', {
        title: 'Iniciar Sesión',
        style: 'users.css'
    })
})

export default router