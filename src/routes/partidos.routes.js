const express = require("express");
const router = express.Router();

const { crearPartido, listarPartidos, actualizarPartido, eliminarPartido } = require("../controllers/partidos.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// PUBLICO
router.get("/", listarPartidos);

// ADMIN
router.post("/", auth, admin, crearPartido);
router.put("/:id", auth, admin, actualizarPartido);
router.delete("/:id", auth, admin, eliminarPartido);

module.exports = router;