const admin = (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ mensaje: "No autenticado" });
    if (req.usuario.rol !== "admin") return res.status(403).json({ mensaje: "Acceso denegado (solo admin)" });

    next();
};

module.exports = admin;