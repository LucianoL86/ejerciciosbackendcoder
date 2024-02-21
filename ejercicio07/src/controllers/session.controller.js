import { Router } from 'express'
import { auth } from '../middleware/index.js'
import passport from 'passport'

const router = Router();

router.post("/login", passport.authenticate('login', {
    successRedirect: '/products',
    failureureRedirect: '/login'
}), async (req, res) => {
    try {
        res.status(200).json({
            respuesta: 'success',
            message: "Sesión iniciada",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al iniciar sesión",
        })
    }
})


router.post("/signup", passport.authenticate('signup', {
    successRedirect: '/login',
    failureureRedirect: '/signup',
}) ,async (req, res) => {
    try {
        res.status(200).json({
            respuesta: 'success',
            message: 'User registered',
        })
    } catch {
        res.status(500).json({
            error: "Error al registrar usuario",
        });
    }
});

router.get("/privado", auth, (req, res) => {
    res.render("topsecret", {
        title: "Privado",
        user: req.session.user,
        style: "users.css",
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

export default router;