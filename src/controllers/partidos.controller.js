const Partido = require("../models/Partido");
const cloudinary = require("../config/cloudinary");

// CREAR PARTIDO (ADMIN)
async function crearPartido(req, res) {
    try {
        const logoData = {};

        if (req.files?.logoLocal) {
            const resultLocal = await cloudinary.uploader.upload(req.files.logoLocal[0].path);
            logoData.local = {
                url: resultLocal.secure_url,
                public_id: resultLocal.public_id
            };
        }
        if (req.files?.logoRival) {
            const resultRival = await cloudinary.uploader.upload(req.files.logoRival[0].path);
            logoData.rival = {
                url: resultRival.secure_url,
                public_id: resultRival.public_id
            };
        }

        const partido = new Partido({
            ...req.body,
            logo: logoData
        });

        await partido.save();
        res.status(201).json(partido)
    } catch (error) {
        console.error(error);  // Para debugging
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
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ mensaje: "Partido no encontrado" });

        if (req.files?.logoLocal) {
            if (partido.logo?.local?.public_id) {
                await cloudinary.uploader.destroy(partido.logo.local.public_id);
            }
            const resultLocal = await cloudinary.uploader.upload(req.files.logoLocal[0].path);
            partido.logo.local = {
                url: resultLocal.secure_url,
                public_id: resultLocal.public_id
            };
        }
        if (req.files?.logoRival) {
            if (partido.logo?.rival?.public_id) {
                await cloudinary.uploader.destroy(partido.logo.rival.public_id);
            }
            const resultRival = await cloudinary.uploader.upload(req.files.logoRival[0].path);
            partido.logo.rival = {
                url: resultRival.secure_url,
                public_id: resultRival.public_id
            };
        }

        partido.local = req.body.local ?? partido.local;
        partido.rival = req.body.rival ?? partido.rival;
        partido.fecha = req.body.fecha ?? partido.fecha;
        partido.lugar = req.body.lugar ?? partido.lugar;
        partido.competicion = req.body.competicion ?? partido.competicion;
        partido.resultado = req.body.resultado ?? partido.resultado;

        await partido.save();
        res.json(partido);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al actualizar partido" });
    }
}

// ELIMINAR PARTIDO (ADMIN)
async function eliminarPartido(req, res) {
    try {
        const partido = await Partido.findById(req.params.id);
        if (!partido) return res.status(404).json({ mensaje: "Partido no encontrado" });

        if (partido.logo?.local?.public_id) {
            await cloudinary.uploader.destroy(partido.logo.local.public_id);
        }
        if (partido.logo?.rival?.public_id) {
            await cloudinary.uploader.destroy(partido.logo.rival.public_id);
        }

        await partido.deleteOne();
        res.json({ mensaje: "Partido eliminado" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al eliminar partido" });
    }
}

module.exports = { crearPartido, listarPartidos, actualizarPartido, eliminarPartido };