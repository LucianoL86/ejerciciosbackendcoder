import { Router } from 'express'
import isAuthenticated from '../middleware/isAuthenticated.js'
import { authenticate } from 'passport'

const router = Router()

router.get('/signup', authenticate, (req, res) => {
    res.render('signup', {
        title: 'Registrarse',
        style: 'users.css'
    })
})

router.get('/login', authenticate,(req, res) => {
    res.render('login', {
        title: 'Iniciar Sesión',
        style: 'users.css'
    })
})

export default router