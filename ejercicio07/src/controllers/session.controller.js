import { Router } from "express";
import userModel from "../DAOs/mongodb/models/users.model.js";
import { auth } from "../middleware/index.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session.user = email;
        req.session.role = "admin";
        res.status(200).json({
            respuesta: "ok",
        });
    } else {
        const result = await userModel.findOne({ email, password });

        if (result === null) {
            res.status(400).json({
                error: "Usuario o contraseña incorrectos",
            });
        } else {
            req.session.user = email;
            req.session.role = "user";

            const { first_name, last_name } = result;
            res.status(200).json({
                respuesta: "ok",
                user: { first_name, last_name },
            });
        }
    }
});
router.post("/signup", async (req, res) => {
    console.log(req.body);
    const { first_name, last_name, email, password, age } = req.body
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        res.status(400).json({
            error: "El usuario ya existe",
        });
        return;
    }

    const newUser = {
        first_name,
        last_name,
        email,
        password,
        age,
        role: "user",
    };
    console.log(email);

    const result = await userModel.create({
        first_name,
        last_name,
        age,
        email,
        password,
    });

    if (result === null) {
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