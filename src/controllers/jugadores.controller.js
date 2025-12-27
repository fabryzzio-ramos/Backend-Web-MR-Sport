const Jugador = require("../models/Jugador");
const cloudinary = require("../config/cloudinary");

// CREAR JUGADOR (ADMIN)
async function crearJugador(req, res) {
    try {
        const jugador = await Jugador.create({
            ...req.body,
            foto: req.file? {url: req.file.path, public_id: req.file.filename} : null
        });

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
        const jugador = await Jugador.findById(req.params.id);
        if (!jugador) return res.status(404).json({ mensaje: "Jugador no encontrado" });

        if (req.file) {
            if (jugador.foto?.public_id) {
                await cloudinary.uploader.destroy(jugador.foto.public_id);
            }

            jugador.foto = {
                url: req.file.path,
                public_id: req.file.filename
            };
        }

        jugador.nombre = req.body.nombre ?? jugador.nombre;
        jugador.numero = req.body.numero ?? jugador.numero;
        jugador.posicion = req.body.posicion ?? jugador.posicion;

        await jugador.save();

        res.json(jugador);
    } catch (error) {
        res.status(400).json({ mensaje: "Erro al actualizar jugador" });
    }
}

// ELIMINAR JUGADOR (ADMIN)
async function eliminarJugador(req, res) {
    try {
        const jugador = await Jugador.findById(req.params.id);
        if (!jugador) return res.status(404).json({ mensaje: "Jugador no encontrado" });

        if (jugador.foto?.public_id) {
            await cloudinary.uploader.destroy(jugador.foto.public_id);
        }

        await jugador.deleteOne();
        
        res.json({ mensaje: "Jugador eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: "Error al eliminar jugador" });
    }
};

module.exports = { crearJugador, listarJugadores, actualizarJugador, eliminarJugador };