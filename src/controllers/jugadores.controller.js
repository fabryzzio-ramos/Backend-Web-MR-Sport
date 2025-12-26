const Jugador = require("../models/Jugador");

// CREAR JUGADOR (ADMIN)
async function crearJugador(req, res) {
    try {
        const jugador = new Jugador(req.body);
        await jugador.save();
        res.status(201).json(jugador);
    } catch (error) {
        res.status(400).json({ mensaje: "Error al crear juagdor" });
    }
}

// LISTAR JUGADORES (PUBLICO)
async function listarJugadores(req, res) {
    try {
        const jugadores = await Jugador.find().sort({ numero: 1 });
        res.json(jugadores);
    } catch (error) {
        res.status(500).json({ mensaje: "Erro al obtener jugadores" });
    }
}

// ACTUALIZAR JUGADOR (ADMIN)
async function actualizarJugador(req, res) {
    try {
        const jugador = await Jugador.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(jugador);
    } catch (error) {
        res.status(400).json({ mensaje: "Erro al actualizar jugador" });
    }
}

// ELIMINAR JUGADOR (ADMIN)
async function eliminarJugador(req, res) {
    try {
        await Jugador.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Jugador eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar jugador" });
    }
};

module.exports = { crearJugador, listarJugadores, actualizarJugador, eliminarJugador };