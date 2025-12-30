const express = require("express");
const router = express.Router();

const { crearOrden, misOrdenes, todasOrdenes, actualizarEstadoOrden, subirComprobante } = require("../controllers/ordenes.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const uploadComprobante = require("../middlewares/upload/uploadComprobantes");

// USUARIO
router.post("/", auth, crearOrden);
router.post("/:id/comprobante", auth, uploadComprobante.single("comprobante"), subirComprobante)
router.get("/mis-ordenes", auth, misOrdenes);

// ADMIN
router.get("/", auth, admin, todasOrdenes);
router.put("/:id/estado", auth, admin, actualizarEstadoOrden);

module.exports = router;