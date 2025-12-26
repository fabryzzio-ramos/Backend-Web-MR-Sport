const express = require("express");
const router = express.Router();

const { crearJugador, listarJugadores, actualizarJugador, eliminarJugador } = require("../controllers/jugadores.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// PUBLICO
router.get("/", listarJugadores);

// ADMIN
router.post("/", auth, admin, crearJugador);
router.put("/:id", auth, admin, actualizarJugador);
router.delete("/:id", auth, admin, eliminarJugador);

module.exports = router;