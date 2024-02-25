import { Router } from 'express'
import { auth } from '../middleware/index.js'
import passport from 'passport'

const router = Router();

router.post("/login", passport.authenticate('login', {
    failureRedirect: '/failogin'
}), async (req, res) => {

    try {
        res.status(200).json({
            respuesta: 'success',
            message: "Sesión iniciada",
            user: req.user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            error: "Error al iniciar sesión",
        })
    }
})


router.post("/signup", passport.authenticate('signup', {
    failureRedirect: '/signup',
    session: false
}), async (req, res) => {
    try {
        res.status(201).json({
            respuesta: 'success',
            message: 'User registered',
            user: req.user,
        })

    } catch {
        res.status(500).json({
            status: 'error',
            error: "Error al registrar usuario",
        });
    }
});

router.get("/failogin", async (req, res) => {
    res.status(401).json({
        status: 'error',
        error: "Error al iniciar sesión",
    })
})

router.get('/github', passport.authenticate('github', {
    scope: ['user:email']}), async(req, res) => {}
)

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login',}), async (req, res) => {
    req.session.user = req.user,
    req.session.admin = true,
    res.redirect('/products')
})

router.get("/privado", auth, (req, res) => {
    res.render("topsecret", {
        title: "Privado",
        user: req.user,
        style: "users.css",
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

export default router;