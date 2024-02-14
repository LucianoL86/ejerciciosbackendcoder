import { Router } from 'express'
import userModel from '../DAOs/mongodb/models/users.model.js'
import { auth } from '../middleware/index.js'
import { comparePassword, getHashedPassword } from '../utils.js'

const router = Router();

router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.user = email;
            req.session.role = "admin";
            res.status(200).json({
                respuesta: "ok",
            });
        } else {
            const user = await userModel.findOne({ email });

            if (user === null || !comparePassword(password, user.password)) {
                res.status(400).json({
                    error: "Usuario o contraseña incorrectos",
                });
            } else {
                req.session.user = {
                    email: user.email,
                    role: user.role,
                }
                
                const { first_name, last_name } = user;
                res.status(200).json({
                    respuesta: "ok",
                    user: { first_name, last_name },
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al iniciar sesión",
        })
    }
})


router.post("/signup", async (req, res) => {
    try {
        const { first_name, last_name, email, password, age } = req.body
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            res.status(400).json({
                error: "El usuario ya existe",
            });
            return;
        }

        const newUser = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: getHashedPassword(password)
        });

        if (newUser === null) {
            res.status(400).json({
                error: "Error al crear el usuario",
            });
        } else {
            req.session.user = email;
            req.session.role = "admin";
            res.status(201).json({
                respuesta: "Usuario creado con éxito",
            });
        }
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