const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTRO
async function registrar(req, res) {
    try {
        const { nombre, correo, contraseña } = req.body;

        // VERIFICAR SI EXITE
        const existe = await Usuario.findOne({ correo });
        if (existe) return res.status(400).json({ mensaje: "Correo ya registado"});

        // ENCRIPTAR CONTRASEÑA
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contraseña, salt);

        // CREAR USUARIO
        const usuario = new Usuario({
            nombre,
            correo,
            contraseña: hash
        });

        await usuario.save();
        res.status(201).json({ mensaje: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar usuario" });
    }
};

// LOGIN
async function login(req, res) {
    try {
        const { correo, contraseña } = req.body;

        // VERIFICAR SI EXISTE
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) return res.status(400).json({ mensaje: "Usuario no existe" });

        // COMPARAR CONTRASEÑAS
        const esValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!esValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

        // GENERAR TOKEN
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al iniciar sesion" });
    }
}

module.exports = { registrar, login };