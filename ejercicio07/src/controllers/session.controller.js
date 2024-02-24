import { Router } from 'express'
import { auth } from '../middleware/index.js'
import passport from 'passport'

const router = Router();

router.post("/login", passport.authenticate('login', {
    failureRedirect: '/login'
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
            error: "Error al iniciar sesión",
        })
    }
})


router.post("/signup", passport.authenticate('signup', {
    failureRedirect: '/signup',
}) ,async (req, res) => {
    try {
        res.status(201).json({
            respuesta: 'success',
            message: 'User registered',
            user: req.user,         
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
        user: req.user,
        style: "users.css",
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

export default router;