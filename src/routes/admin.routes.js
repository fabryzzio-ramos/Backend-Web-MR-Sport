const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const dashboardController = require("../controllers/dashboard.controller");
const { crearJugador, actualizarJugador, eliminarJugador } = require("../controllers/jugadores.controller");
const { crearProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos.controller");
const { crearPartido, actualizarPartido, eliminarPartido } = require("../controllers/partidos.controller");

router.get("/dashboard", auth, admin, dashboardController);

router.post("/jugadores", auth, admin, crearJugador);
router.put("/jugadores/:id", auth, admin, actualizarJugador);
router.delete("/jugadores/:id", auth, admin, eliminarJugador);

router.post("/productos", auth, admin, crearProducto);
router.put("/productos/:id", auth, admin, actualizarProducto);
router.delete("/productos/:id", auth, admin, eliminarProducto);

router.post("/partidos", auth, admin, crearPartido);
router.put("/partidos/:id", auth, admin, actualizarPartido);
router.delete("/partidos/:id", auth, admin, eliminarPartido);

module.exports = router;