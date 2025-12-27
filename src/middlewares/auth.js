const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

async function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ mensaje: "No autorizado" });

        // VERIFICAR TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // BUSCAR USUARIO
        const usuario = await Usuario.findById(decoded.id).select("-contraseña");
        if (!usuario) return res.status(401).json({ mensaje: "Usuario no valido" });

        // ADJUNTAR USUARIO AL REQUEST 
        req.usuario = usuario;

        next();
    } catch {
        res.status(401).json({ mensaje: "Token invalido" });
    }
};

module.exports = auth;