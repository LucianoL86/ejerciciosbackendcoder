import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Iniciar Sesión',
        style: 'users.css'
    })
})

export default router