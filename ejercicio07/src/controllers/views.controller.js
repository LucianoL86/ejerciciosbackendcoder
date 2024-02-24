import { Router } from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'

const router = Router()

router.get('/signup', isAuthenticated, (req, res) => {
    res.render('signup', {
        title: 'Registrarse',
        style: 'users.css'
    })
})

router.get('/login', isAuthenticated,(req, res) => {
    res.render('login', {
        title: 'Iniciar Sesión',
        style: 'users.css'
    })
})

export default router