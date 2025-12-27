const express = require("express");
const router = express.Router();

const { crearJugador, listarJugadores, actualizarJugador, eliminarJugador } = require("../controllers/jugadores.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const upload = require("../middlewares/upload");

// PUBLICO
router.get("/", listarJugadores);

// ADMIN
router.post("/", auth, admin, upload.single("foto"), crearJugador);
router.put("/:id", auth, admin, actualizarJugador);
router.delete("/:id", auth, admin, eliminarJugador);

module.exports = router;