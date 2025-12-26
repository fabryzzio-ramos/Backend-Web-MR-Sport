const Partido = require("../models/Partido");

// CREAR PARTIDO (ADMIN)
async function crearPartido(req, res) {
    try {
        const partido = new Partido(req.body);
        await partido.save();
        res.status(201).json(partido)
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear partido" });
    }
}

// LISTAR PARTIDOS (PUBLICO)
async function listarPartidos(req, res) {
    try {
        const partidos = await Partido.find().sort({ fecha: 1 });
        res.json(partidos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener partidos" });
    }
}

// ACTUALIZAR PARTIDO (ADMIN)
async function actualizarPartido(req, res) {
    try {
        const partido = await Partido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new:true }
        );
        res.json(partido);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al actualizar partido" });
    }
}

// ELIMINAR PARTIDO (ADMIN)
async function eliminarPartido(req, res) {
    try {
        await Partido.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Partido eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar partido" });
    }
}

module.exports = { crearPartido, listarPartidos, actualizarPartido, eliminarPartido };