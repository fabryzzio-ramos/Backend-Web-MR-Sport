const express = require("express");
const router = express.Router();

const { crearOrden, misOrdenes, todasOrdenes } = require("../controllers/ordenes.controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// USUARIO
router.post("/", auth, crearOrden);
router.get("/mis-ordenes", auth, misOrdenes);

// ADMIN
router.get("/", auth, admin, todasOrdenes);

module.exports = router;