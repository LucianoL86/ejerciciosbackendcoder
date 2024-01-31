import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.render('login', {
        title: 'Iniciar sesión',
        style: 'style.css'
    })
})

export default router