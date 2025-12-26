const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registrar, login } = require("../controllers/auth.controller");
const validar = require("../middlewares/validar");

// RUTAS
router.post("/register", [
    body("nombre").notEmpty().withMessage("Nombre obligatorio"),
    body("correo").isEmail().withMessage("Correo invalido"),
    body("contraseña").isLength({ min:6}).withMessage("Minimo 6 caracteres")
], validar, registrar);

router.post("/login", [
    body("correo").isEmail().withMessage("Correo invalido"),
    body("contraseña").notEmpty().withMessage("Contraseña requerida")
], validar, login);

module.exports = router;